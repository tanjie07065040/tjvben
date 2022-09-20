<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <log></log>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import log from './components/log.vue';
import { PageWrapper } from '/@/components/Page';
const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
