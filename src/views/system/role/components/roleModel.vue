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

import { RoleFormSchema } from './role.data';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';

export default defineComponent({
  name: 'roleModel',
  components: { BasicModal, BasicForm, BasicTree },

  setup(_, { emit }) {

    const isUpdate = ref(true);
    const currentNodeKey = ref();

    const [registerOrgForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 100,
      schemas: RoleFormSchema,
      // 弹出表单是否显示ActionButton
      showActionButtonGroup: false,
    })

    const [registerOrgModel, { setModalProps, closeModal }] = useModalInner((data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      currentNodeKey.value = data?.record;
      if (unref(isUpdate)) {
        setFieldsValue({
          ...data?.record
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
