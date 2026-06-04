<script setup>
import { ref } from 'vue'
import RoleSelectView from './views/RoleSelectView.vue'
import SenderView from './views/SenderView.vue'
import ViewerView from './views/ViewerView.vue'

const role = ref(null)

function selectRole(selected) {
  role.value = selected
}

function goBack() {
  role.value = null
}
</script>

<template>
  <RoleSelectView v-if="!role" @select="selectRole" />
  <SenderView v-else-if="role === 'sender'" @back="goBack" />
  <ViewerView v-else @back="goBack" />
</template>
