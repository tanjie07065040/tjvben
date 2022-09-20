<template>
  <PageWrapper dense contentClass="flex">
    <role></role>
  </PageWrapper>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
import role from './components/role.vue';
import { PageWrapper } from '/@/components/Page';
const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 1500);
</script>
