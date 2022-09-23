<template>
  <div>
    <BasicModal @register="registerAppModal" :title="TitleContent" v-bind="$attrs" @ok="handleSubmit">
      <BasicForm @register="registerApForm">
      </BasicForm>
    </BasicModal>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { AppFormSchema } from './app.data';

export default defineComponent({
  name: 'appModel',
  components: { BasicModal, BasicForm },

  setup(_, { emit }) {

    const TitleContent = computed(() =>
      !unref(isUpdate) ? '新增' : '编辑'
    );
    const isUpdate = ref(true);
    const currentNodeKey: any = ref();

    const [registerAppModal, { setModalProps, closeModal }] = useModalInner((data) => {
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

    const [registerApForm, { resetFields, validate, setFieldsValue }] = useForm({
      labelWidth: 100,
      schemas: AppFormSchema,
      showActionButtonGroup: false,
    });

    async function handleSubmit() {
      setModalProps({ confirmLoading: true });
      const info = await validate();

      emit('success', {
        isUpdate: unref(isUpdate), values: {
          id: currentNodeKey.value.id,
          name: info.name,
          sex: info.sex
        }
      });
      // 关闭模态框
      closeModal();
      setModalProps({ confirmLoading: false });
    }

    // 初始化加载数据
    onMounted(() => {

    })

    // 页面释放
    onUnmounted(() => {
    })


    return {
      handleSubmit,
      registerAppModal,
      registerApForm,
      TitleContent
    }
  },

});
</script>
