<template>
  <div >
    <app></app>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import app from './components/app.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
