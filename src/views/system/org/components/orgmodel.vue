<template>
  <div>
    <BasicModal class="model-center-btn" v-bind="$attrs" @register="registerOrgModel" :title="OrgTitle"
      @ok="orghandleSubmit">
      <BasicForm @register="registerOrgForm">
      </BasicForm>
    </BasicModal>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, unref } from 'vue';
import { BasicTree } from '/@/components/Tree';

import { orgFormSchema } from './org.data';
import user from './user.vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';

export default defineComponent({
  name: 'orgOperationManager',
  components: { BasicModal, BasicForm, BasicTree, user },

  setup(_, { emit }) {

    const isUpdate = ref(true);
    const currentNodeKey = ref();

    const [registerOrgForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 100,
      schemas: orgFormSchema,
      // 弹出表单是否显示ActionButton
      showActionButtonGroup: false,
    })

    const [registerOrgModel, { setModalProps, closeModal }] = useModalInner((data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      currentNodeKey.value = data?.currentNodeKey;
      if (unref(isUpdate)) {
        setFieldsValue({
          ...data?.node
        })
      }
    });

    const OrgTitle = computed(() =>
      !unref(isUpdate) ? '新增' : '编辑'
    );


    // 组织机构操作事件方法
    async function orghandleSubmit() {
      const values = await validate();
      console.log(values);
      setModalProps({ confirmLoading: true });

      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: values, parentKey: currentNodeKey });
      setModalProps({ confirmLoading: false });

    }



    // 初始化加载数据
    onMounted(() => {
    })

    // 页面释放
    onUnmounted(() => {
    })


    return {
      registerOrgModel,
      registerOrgForm,
      orghandleSubmit,
      OrgTitle,
    }
  },

});
</script>
