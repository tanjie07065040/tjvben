<template>
  <BasicModal class="model-center-btn" v-bind="$attrs" @register="registerOrgModel" :title="OrgTitle" :height=600
    :width=600 @ok="orghandleSubmit">
    <PageWrapper>
      <a-row :span="20">
        <a-col :span="10">
          <span>用户姓名：{{name}}</span>
        </a-col>
        <a-col :span="10">
          <span>组织机构名称：{{orgname}}</span>
        </a-col>
      </a-row>
      <a-divider />
      <a-row :span="20" style="width: 600px">
        <a-transfer :data-source="mockData" key="id" :titles="['未选择', '已选择']" :target-keys="targetKeys"
          :show-search="true" :list-style="{
            width: '250px',
            height: '300px',
          }" :selected-keys="selectedKeys" :render="item => item.rolename" @change="handleChange"
          @selectChange="handleSelectChange" />
      </a-row>
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { RoleModel } from '/@/api/system/model/roleModel';
import { ApiTransfer } from '/@/components/Form';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { PageWrapper } from '/@/components/Page';
import { buildUUID } from '/@/utils/uuid';

export interface TransferModel extends RoleModel {
  key?: string,
}

export default defineComponent({
  name: 'userrolerelationModel',
  components: { BasicModal, ApiTransfer, PageWrapper },


  setup(_, { emit }) {

    const name = ref('');
    const orgname = ref('');

    const mockData: TransferModel[] = [];
    // NOTICE 数据源包含未选择数据和已选择数据 需要初始化时候各自放进去（拿取key集合信息）
    const targetKeys = ref<string[]>([]);
    const selectedKeys = ref<string[]>([]);
    const [registerOrgModel, { setModalProps, closeModal }] = useModalInner((data) => {

      setModalProps({ confirmLoading: false });
      name.value = data?.record.name;
      orgname.value = data?.record.orgname;
    });

    const OrgTitle = '用户角色关联';


    // 组织机构操作事件方法
    async function orghandleSubmit() {
      setModalProps({ confirmLoading: true });

      closeModal();
      setModalProps({ confirmLoading: false });
      emit('success');

    }

    const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
      targetKeys.value = nextTargetKeys;
      console.log('targetKeys: ', nextTargetKeys);
      console.log('direction: ', direction);
      console.log('moveKeys: ', moveKeys);
    };

    const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
      selectedKeys.value = [...sourceSelectedKeys, ...targetSelectedKeys];
      console.log('sourceSelectedKeys: ', sourceSelectedKeys);
      console.log('targetSelectedKeys: ', targetSelectedKeys);
    };


    // 初始化加载数据
    onMounted(() => {
      for (let i = 0; i < 20; i++) {
        mockData.push({
          key: buildUUID(),
          rolename: `角色-${i + 1}`,
        });
      }
    })

    // 页面释放
    onUnmounted(() => {
    })


    return {
      registerOrgModel,
      orghandleSubmit,
      OrgTitle,
      name,
      orgname,
      mockData,
      targetKeys,
      selectedKeys,
      handleSelectChange,
      handleChange,
    }
  },

});
</script>
