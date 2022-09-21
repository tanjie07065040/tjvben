<template>
  <PageWrapper :dense="true" :fixed-height="true" :content-full-height="true" contentClass="flex">
    <div style="width: 20%">
      <roleapp></roleapp>
    </div>
    <div style="width: 80%">
      <role></role>
    </div>
  </PageWrapper>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
import role from './components/role.vue';
import roleapp from './components/roleapp.vue';
import { PageWrapper } from '/@/components/Page';
const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
