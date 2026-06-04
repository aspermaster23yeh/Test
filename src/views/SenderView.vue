<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useActiveKey } from '../composables/useActiveKey'
import { quadrants, VALID_KEYS, getQuadrant } from '../config/quadrants'

const { activeKey, sendKey, clearKey } = useActiveKey({ isSender: true })

const viewerUrl = computed(() => {
  const url = new URL(window.location.href)
  url.searchParams.delete('role')
  return url.toString()
})

const activeQuadrant = computed(() => getQuadrant(activeKey.value))

function isActive(key) {
  return activeKey.value === key
}

function onKeyDown(event) {
  if (event.repeat) return
  const key = event.key.toUpperCase()
  if (VALID_KEYS.has(key)) {
    event.preventDefault()
    sendKey(key)
  }
}

function onKeyUp(event) {
  const key = event.key.toUpperCase()
  if (VALID_KEYS.has(key) && activeKey.value === key) {
    event.preventDefault()
    clearKey()
  }
}

function onPointerDown(key) {
  sendKey(key)
}

function onPointerUp(key) {
  if (activeKey.value === key) clearKey()
}

function onPointerLeave(key) {
  if (activeKey.value === key) clearKey()
}

async function copyViewerLink() {
  await navigator.clipboard.writeText(viewerUrl.value)
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
})
</script>

<template>
  <div class="dashboard">
    <header class="header">
      <div>
        <h1>Panel de control</h1>
        <p class="subtitle">Envía la letra y el color al espectador</p>
      </div>
      <div v-if="activeQuadrant" class="status-pill" :style="{ backgroundColor: activeQuadrant.color }">
        Enviando: {{ activeQuadrant.key }}
      </div>
      <div v-else class="status-pill idle">Sin señal activa</div>
    </header>

    <main class="controls">
      <button
        v-for="item in quadrants"
        :key="item.key"
        type="button"
        class="control-btn"
        :class="{ active: isActive(item.key) }"
        :style="{ '--btn-color': item.color }"
        :aria-label="`Enviar cuadrante ${item.key}`"
        :aria-pressed="isActive(item.key)"
        @pointerdown.prevent="onPointerDown(item.key)"
        @pointerup.prevent="onPointerUp(item.key)"
        @pointerleave="onPointerLeave(item.key)"
        @pointercancel="onPointerLeave(item.key)"
      >
        <span class="control-letter">{{ item.key }}</span>
        <span class="control-color">{{ item.color }}</span>
      </button>
    </main>

    <footer class="footer">
      <div class="link-box">
        <span class="link-label">Enlace del espectador</span>
        <code class="link-url">{{ viewerUrl }}</code>
      </div>
      <button type="button" class="copy-btn" @click="copyViewerLink">Copiar enlace</button>
      <p class="help">Usa las teclas A, B, C o D (mantén pulsado para enviar)</p>
    </footer>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 24px;
  background: #121212;
  color: #f5f5f5;
  overflow: auto;
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
}

.status-pill {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.status-pill.idle {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
}

.controls {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  min-height: 0;
}

.control-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 140px;
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: color-mix(in srgb, var(--btn-color) 18%, #1e1e1e);
  cursor: pointer;
  transition:
    transform 0.12s ease,
    border-color 0.12s ease,
    box-shadow 0.12s ease;
  -webkit-tap-highlight-color: transparent;
}

.control-btn:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.control-btn.active {
  transform: scale(1.02);
  border-color: var(--btn-color);
  box-shadow: 0 0 24px color-mix(in srgb, var(--btn-color) 50%, transparent);
  background: color-mix(in srgb, var(--btn-color) 35%, #1e1e1e);
}

.control-letter {
  font-size: clamp(2.5rem, 10vw, 4rem);
  font-weight: 800;
  color: var(--btn-color);
}

.control-color {
  font-size: 0.75rem;
  font-family: ui-monospace, monospace;
  color: rgba(255, 255, 255, 0.45);
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.link-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.link-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.link-url {
  font-size: 0.8rem;
  word-break: break-all;
  color: rgba(255, 255, 255, 0.7);
}

.copy-btn {
  align-self: flex-start;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.18);
}

.help {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 640px) {
  .dashboard {
    padding: 16px;
    gap: 16px;
  }

  .controls {
    grid-template-columns: 1fr;
  }

  .control-btn {
    min-height: 100px;
  }
}
</style>
