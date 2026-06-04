<script setup>
defineProps({
  isConnected: { type: Boolean, default: false },
  connectionError: { type: String, default: null },
})

defineEmits(['back'])
</script>

<template>
  <div class="connection-bar">
    <button type="button" class="back-btn" @click="$emit('back')">← Cambiar rol</button>

    <div class="status">
      <span v-if="connectionError" class="badge error">{{ connectionError }}</span>
      <span v-else-if="isConnected" class="badge ok">Conectado</span>
      <span v-else class="badge pending">Conectando…</span>
    </div>
  </div>
</template>

<style scoped>
.connection-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  pointer-events: none;
}

.back-btn,
.status {
  pointer-events: auto;
}

.back-btn {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(6px);
}

.back-btn:hover {
  background: rgba(0, 0, 0, 0.5);
}

.badge {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(6px);
}

.badge.ok {
  background: rgba(67, 160, 71, 0.25);
  color: #a5d6a7;
}

.badge.pending {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.55);
}

.badge.error {
  max-width: min(280px, 50vw);
  background: rgba(229, 57, 53, 0.25);
  color: #ef9a9a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
