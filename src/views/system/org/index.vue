<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <org></org>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import org from './components/org.vue';
import { PageWrapper } from '/@/components/Page';
const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
