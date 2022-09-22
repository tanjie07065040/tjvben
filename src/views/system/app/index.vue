<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <div style="width: 100%; height: 100%">
    <app></app>
    </div>
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
