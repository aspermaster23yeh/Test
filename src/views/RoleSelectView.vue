<script setup>
defineEmits(['select'])
</script>

<template>
  <div class="role-select">
    <div class="content">
      <h1>ABCD</h1>
      <p class="subtitle">Selecciona tu rol para comenzar</p>

      <div class="options">
        <button type="button" class="option sender" @click="$emit('select', 'sender')">
          <span class="option-icon">T</span>
          <span class="option-title">Transmisor</span>
          <span class="option-desc">Envía letras y colores al espectador</span>
        </button>

        <button type="button" class="option receiver" @click="$emit('select', 'receiver')">
          <span class="option-icon">E</span>
          <span class="option-title">Espectador</span>
          <span class="option-desc">Muestra en pantalla completa lo que recibes</span>
        </button>
      </div>

      <p class="hint">Abre esta misma app en otro dispositivo y elige el otro rol</p>
    </div>
  </div>
</template>

<style scoped>
.role-select {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #121212;
  color: #f5f5f5;
  padding: 24px;
}

.content {
  width: 100%;
  max-width: 520px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 32px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 28px 24px;
  border: 2px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: #1a1a1a;
  color: inherit;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    transform 0.15s ease,
    background 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}

.option:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.28);
}

.option.sender:hover {
  border-color: #1e88e5;
  background: color-mix(in srgb, #1e88e5 12%, #1a1a1a);
}

.option.receiver:hover {
  border-color: #43a047;
  background: color-mix(in srgb, #43a047 12%, #1a1a1a);
}

.option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1;
}

.sender .option-icon {
  background: rgba(30, 136, 229, 0.2);
  color: #64b5f6;
}

.receiver .option-icon {
  background: rgba(67, 160, 71, 0.2);
  color: #81c784;
}

.option-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.option-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.hint {
  margin-top: 28px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
}
</style>
