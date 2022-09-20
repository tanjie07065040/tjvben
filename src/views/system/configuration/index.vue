<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <configurationgroupVue></configurationgroupVue>
    <configuration></configuration>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import configuration from './components/configuration.vue';
import configurationgroupVue from './components/configurationgroup.vue';
import { PageWrapper } from '/@/components/Page';

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
