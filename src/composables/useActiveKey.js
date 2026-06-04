import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onValue, set } from 'firebase/database'
import { getActiveKeyRef, getConnectedRef } from '../firebase'
import { parseSignal, VALID_KEYS } from '../config/quadrants'

function formatFirebaseError(error) {
  const message = error?.message ?? ''
  if (message.includes('permission_denied')) {
    return 'Sin permiso en Firebase. Activa lectura/escritura en /activeKey (Realtime Database → Reglas).'
  }
  return message || 'Error de conexión con Firebase'
}

export function useActiveKey({ isSender = false } = {}) {
  const remoteActiveSignal = ref(null)
  const localActiveSignal = ref(null)
  const isConnected = ref(false)
  const connectionError = ref(null)

  const activeSignal = computed(() => (isSender ? localActiveSignal.value : remoteActiveSignal.value))

  async function sendSignal(key, number) {
    if (!isSender || !VALID_KEYS.has(key)) return

    const parsedNumber = Number(number)
    const signal = {
      number: Number.isFinite(parsedNumber) && parsedNumber > 0 ? Math.floor(parsedNumber) : 1,
      key,
    }

    try {
      localActiveSignal.value = signal
      await set(getActiveKeyRef(), signal)
      connectionError.value = null
    } catch (error) {
      connectionError.value = formatFirebaseError(error)
      localActiveSignal.value = null
    }
  }

  async function clearSignal() {
    if (!isSender) return
    try {
      localActiveSignal.value = null
      await set(getActiveKeyRef(), null)
      connectionError.value = null
    } catch (error) {
      connectionError.value = formatFirebaseError(error)
    }
  }

  let unsubscribeKey = null
  let unsubscribeConnected = null

  onMounted(() => {
    unsubscribeKey = onValue(
      getActiveKeyRef(),
      (snapshot) => {
        remoteActiveSignal.value = parseSignal(snapshot.val())
        connectionError.value = null
      },
      (error) => {
        connectionError.value = formatFirebaseError(error)
      },
    )

    unsubscribeConnected = onValue(getConnectedRef(), (snapshot) => {
      isConnected.value = snapshot.val() === true
    })
  })

  onUnmounted(() => {
    unsubscribeKey?.()
    unsubscribeConnected?.()
  })

  return {
    activeSignal,
    localActiveSignal,
    remoteActiveSignal,
    isConnected,
    connectionError,
    sendSignal,
    clearSignal,
  }
}
