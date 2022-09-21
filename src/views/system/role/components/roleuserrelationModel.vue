<template>
  <div>
    <BasicModal class="model-center-btn" v-bind="$attrs" @register="registerOrgModel" :title="OrgTitle" :height=600
      :width=600 @ok="orghandleSubmit">
      <PageWrapper>
        <a-row :span="16">
          <a-col :span="8">
            <span>角色名称：{{rolename}}</span>
          </a-col>
          <a-col :span="8">
            <span>应用名称：{{appname}}</span>
          </a-col>
        </a-row>
        <a-divider />
        <a-row :span="16">
          <a-transfer :data-source="mockData" key="id" :titles="['未选择', '已选择']" :target-keys="targetKeys" :show-search="true" :list-style="{
            width: '250px',
            height: '300px',
          }" :selected-keys="selectedKeys" :render="item => item.name" @change="handleChange"
            @selectChange="handleSelectChange" />
        </a-row>
      </PageWrapper>
    </BasicModal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { UserModel } from '/@/api/system/model/userModel';
import { ApiTransfer } from '/@/components/Form';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { PageWrapper } from '/@/components/Page';
import { buildUUID } from '/@/utils/uuid';

export interface TransferModel extends UserModel {
  key?: string,
}

export default defineComponent({
  name: 'roleuserrelationModel',
  components: { BasicModal, ApiTransfer, PageWrapper },


  setup(_, { emit }) {

    const rolename = ref('');
    const appname = ref('');

    const mockData: TransferModel[] = [];
    // NOTICE 数据源包含未选择数据和已选择数据 需要初始化时候各自放进去（拿取key集合信息）
    const targetKeys = ref<string[]>([]);
    const selectedKeys = ref<string[]>([]);
    const [registerOrgModel, { setModalProps, closeModal }] = useModalInner((data) => {

      setModalProps({ confirmLoading: false });
      rolename.value = data?.record.rolename;
      appname.value = data?.record.appname;
    });

    const OrgTitle = '角色用户关联';


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
          name: `姓名-${i + 1}`,
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
      rolename,
      appname,
      mockData,
      targetKeys,
      selectedKeys,
      handleSelectChange,
      handleChange,
    }
  },

});
</script>
