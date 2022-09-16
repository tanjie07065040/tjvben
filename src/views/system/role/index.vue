<template>
  <div>
    <role></role>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import role from './components/role.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
