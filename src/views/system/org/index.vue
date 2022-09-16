<template>
  <div >
    <org></org>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import org from './components/org.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
