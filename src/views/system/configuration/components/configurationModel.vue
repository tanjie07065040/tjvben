<template>
  <div>
    <BasicModal class="model-center-btn" v-bind="$attrs" @register="registerConfigurationModel" :title="OrgTitle"
      @ok="orghandleSubmit">
      <BasicForm @register="registerOrgForm">
      </BasicForm>
    </BasicModal>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, unref } from 'vue';


import { ConfigurationFormSchema } from './configuration.data';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';

export default defineComponent({
  name: 'configurationManagerModel',
  components: { BasicModal, BasicForm },

  setup(_, { emit }) {

    const isUpdate = ref(true);
    const currentNodeKey = ref();

    const [registerOrgForm, { resetFields, setFieldsValue, validate }] = useForm({
      labelWidth: 100,
      schemas: ConfigurationFormSchema,
      // 弹出表单是否显示ActionButton
      showActionButtonGroup: false,
    })

    const [registerConfigurationModel, { setModalProps, closeModal }] = useModalInner((data) => {
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
      registerConfigurationModel,
      registerOrgForm,
      orghandleSubmit,
      OrgTitle,
    }
  },

});
</script>
