<template>
  <div >
    <configuration></configuration>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import configuration from './components/configuration.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
