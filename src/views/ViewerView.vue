<script setup>
import { onMounted, onUnmounted } from 'vue'
import ConnectionBar from '../components/ConnectionBar.vue'
import { useActiveKey } from '../composables/useActiveKey'
import { quadrants } from '../config/quadrants'

defineEmits(['back'])

const { activeKey, isConnected, connectionError } = useActiveKey({ isSender: false })

function isActive(key) {
  return activeKey.value === key
}

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
  <div class="viewer">
    <ConnectionBar
      :is-connected="isConnected"
      :connection-error="connectionError"
      @back="$emit('back')"
    />

    <main class="grid">
      <div
        v-for="item in quadrants"
        :key="item.key"
        class="quadrant"
        :class="{ active: isActive(item.key), dimmed: activeKey && !isActive(item.key) }"
        :style="{ backgroundColor: item.color }"
      >
        <span class="quadrant-letter">{{ item.key }}</span>
      </div>
    </main>

    <p class="hint">Pulsa F para pantalla completa</p>
  </div>
</template>

<style scoped>
.viewer {
  position: relative;
  width: 100%;
  height: 100%;
  background: #4a4a4a;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  min-height: 0;
}

.quadrant {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  min-width: 0;
  opacity: 0.92;
  transform: scale(1);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.quadrant.dimmed {
  opacity: 0.55;
}

.quadrant.active {
  opacity: 1;
  transform: scale(1.03);
  z-index: 1;
  box-shadow:
    0 0 24px rgba(255, 255, 255, 0.75),
    0 0 48px rgba(255, 255, 255, 0.35);
}

.quadrant-letter {
  font-size: clamp(4rem, 18vw, 12rem);
  font-weight: 700;
  line-height: 1;
  color: #ffffff;
  user-select: none;
}

.hint {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.25);
  pointer-events: none;
}

@media (max-width: 768px) {
  .viewer {
    padding: 8px;
  }

  .grid {
    gap: 8px;
  }

  .quadrant-letter {
    font-size: clamp(3rem, 22vw, 6rem);
  }
}
</style>
