<template>
  <BasicModal @register="registerUserModal" :title="TitleContent" v-bind="$attrs" @ok="handleSubmit">
    <BasicForm @register="registerUserForm">
      <template #user="{ model, field }">
        <div>
          <a-select :options=SexOptions v-model:value="model[field]" allowClear />
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { computed, unref } from '@vue/reactivity';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { UserFormSchema } from './user.data';
import { RoleModel } from '/@/api/system/model/roleModel';
import { BasicForm, useForm } from '/@/components/Form';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { PageWrapper } from '/@/components/Page';

export interface TransferModel extends RoleModel {
  key?: string,
}

export default defineComponent({
  name: 'userModel',
  components: { BasicModal, BasicForm, PageWrapper },


  setup(_, { emit }) {

    const SexOptions: any = ref([]);
    const currentNodeKey: any = ref();
    const TitleContent = computed(() =>
      !unref(isUpdate) ? '新增' : '编辑'
    );
    const isUpdate = ref(true);

    const [registerUserModal, { setModalProps, closeModal }] = useModalInner((data) => {
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

    const [registerUserForm, { validate, setFieldsValue, resetFields }] = useForm({
      labelWidth: 100,
      schemas: UserFormSchema,
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
      SexOptions.value = [
        {
          label: '男',
          value: 'man'
        },
        {
          label: '女',
          value: 'women'
        },
        {
          label: '其他',
          value: 'other'
        },
      ];
    })

    // 页面释放
    onUnmounted(() => {
    })


    return {
      handleSubmit,
      registerUserForm,
      registerUserModal,
      TitleContent,
      SexOptions
    }
  },

});
</script>