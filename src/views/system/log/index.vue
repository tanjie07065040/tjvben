<template>
  <div >
    <log></log>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import log from './components/log.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
