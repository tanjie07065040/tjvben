<template>
  <PageWrapper :dense="true" :content-full-height="true" :fixed-height="true" content-class="flex">
    <div style="width: 20%">
      <roleappVue></roleappVue>
    </div>
    <div style="width: 80%">
      <Menu></Menu>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Menu from './components/menu.vue';
import roleappVue from '../role/components/roleapp.vue';
import { PageWrapper } from '/@/components/Page';

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
