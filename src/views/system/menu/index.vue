<template>
  <div>
    <Menu></Menu>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Menu from './components/menu.vue';

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
