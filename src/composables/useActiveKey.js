import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onValue, set } from 'firebase/database'
import { activeKeyRef } from '../firebase'
import { VALID_KEYS } from '../config/quadrants'

export function useActiveKey({ isSender = false } = {}) {
  const remoteActiveKey = ref(null)
  const localActiveKey = ref(null)

  const activeKey = computed(() => (isSender ? localActiveKey.value : remoteActiveKey.value))

  async function sendKey(key) {
    if (!isSender || !VALID_KEYS.has(key)) return
    localActiveKey.value = key
    await set(activeKeyRef, key)
  }

  async function clearKey() {
    if (!isSender) return
    localActiveKey.value = null
    await set(activeKeyRef, null)
  }

  let unsubscribe = null

  onMounted(() => {
    unsubscribe = onValue(activeKeyRef, (snapshot) => {
      const value = snapshot.val()
      remoteActiveKey.value = VALID_KEYS.has(value) ? value : null
    })
  })

  onUnmounted(() => {
    unsubscribe?.()
  })

  return {
    activeKey,
    localActiveKey,
    remoteActiveKey,
    sendKey,
    clearKey,
  }
}
