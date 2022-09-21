<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <div style="width: 35%">
      <configurationgroupVue></configurationgroupVue>
    </div>

    <div style="width: 65%">
      <configuration></configuration>
    </div>

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
