<script setup>
import { computed } from 'vue'
import SenderView from './views/SenderView.vue'
import ViewerView from './views/ViewerView.vue'

const isSender = computed(
  () => new URLSearchParams(window.location.search).get('role') === 'sender',
)
</script>

<template>
  <SenderView v-if="isSender" />
  <ViewerView v-else />
</template>
