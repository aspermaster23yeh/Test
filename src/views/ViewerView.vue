<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import ConnectionBar from '../components/ConnectionBar.vue'
import { useActiveKey } from '../composables/useActiveKey'
import { getQuadrant, formatSignalLabel } from '../config/quadrants'

defineEmits(['back'])

const { activeSignal, isConnected, connectionError } = useActiveKey({ isSender: false })

const activeQuadrant = computed(() => getQuadrant(activeSignal.value?.key ?? null))

const screenStyle = computed(() => ({
  backgroundColor: activeQuadrant.value?.color ?? '#1a1a1a',
}))

const displayLabel = computed(() => formatSignalLabel(activeSignal.value))

function requestFullscreen() {
  document.documentElement.requestFullscreen?.().catch(() => {})
}

function onKeyDown(event) {
  if (event.key === 'f' || event.key === 'F') {
    event.preventDefault()
    requestFullscreen()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div class="viewer" :style="screenStyle">
    <ConnectionBar
      :is-connected="isConnected"
      :connection-error="connectionError"
      @back="$emit('back')"
    />

    <div class="viewer-content">
      <span v-if="activeSignal" class="label">{{ displayLabel }}</span>
      <span v-else class="waiting">Esperando señal…</span>
    </div>

    <p class="hint">Pulsa F para pantalla completa</p>
  </div>
</template>

<style scoped>
.viewer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.viewer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.label {
  font-size: clamp(4rem, 28vw, 16rem);
  font-weight: 800;
  line-height: 1;
  color: #ffffff;
  user-select: none;
  font-variant-numeric: tabular-nums;
  animation: fade-in 0.15s ease;
}

.waiting {
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.35);
  letter-spacing: 0.02em;
}

.hint {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.25);
  pointer-events: none;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
