<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <app></app>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import app from './components/app.vue';
import { PageWrapper } from '/@/components/Page';
const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
