import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onValue, set } from 'firebase/database'
import { getActiveKeyRef, getConnectedRef } from '../firebase'
import { VALID_KEYS } from '../config/quadrants'

function formatFirebaseError(error) {
  const message = error?.message ?? ''
  if (message.includes('permission_denied')) {
    return 'Sin permiso en Firebase. Activa lectura/escritura en /activeKey (Realtime Database → Reglas).'
  }
  return message || 'Error de conexión con Firebase'
}

export function useActiveKey({ isSender = false } = {}) {
  const remoteActiveKey = ref(null)
  const localActiveKey = ref(null)
  const isConnected = ref(false)
  const connectionError = ref(null)

  const activeKey = computed(() => (isSender ? localActiveKey.value : remoteActiveKey.value))

  async function sendKey(key) {
    if (!isSender || !VALID_KEYS.has(key)) return
    try {
      localActiveKey.value = key
      await set(getActiveKeyRef(), key)
      connectionError.value = null
    } catch (error) {
      connectionError.value = formatFirebaseError(error)
      localActiveKey.value = null
    }
  }

  async function clearKey() {
    if (!isSender) return
    try {
      localActiveKey.value = null
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
        const value = snapshot.val()
        remoteActiveKey.value = VALID_KEYS.has(value) ? value : null
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
    activeKey,
    localActiveKey,
    remoteActiveKey,
    isConnected,
    connectionError,
    sendKey,
    clearKey,
  }
}
