<template>
  <div class="system_org">
    <div class="system_org_left">
      <BasicTree ref="orgTreeRef" title="组织机构" helpMessage="组织机构" :treeData="treeDataList" :checkable="true"
        :loading="treeLoading" :toolbar="true" :search="true" :renderIcon="createIcon" :selectedKeys="selectedKeys"
        :actionList="OrgActionList" :fieldNames="{ title: 'orgname', key: 'id' }" @select="handleSelect"
        @check="handleCheck">
      </BasicTree>
      <!--自定义属性title和key " -->
    </div>
    <orgModal @register="registerOrgModel" @success="orghandleSuccess"></orgModal>
    <div class="system_org_right">
      <user></user>
    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent, h, onMounted, onUnmounted, ref, unref, toRaw } from 'vue';
import { BasicTree, TreeActionItem, TreeActionType, TreeItem } from '/@/components/Tree';
import { cloneDeep } from 'lodash-es';

import { orgFormSchema, treeData } from './org.data';
import user from './user.vue';
import orgModal from './orgmodel.vue';
import { BasicModal, useModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useMessage } from '/@/hooks/web/useMessage';

export default defineComponent({
  name: 'orgManager',
  components: { BasicModal, BasicForm, BasicTree, user, orgModal },
  setup(_, { emit }) {

    // 消息提示组件
    const { createMessage } = useMessage();

    const orgTreeRef = ref<Nullable<TreeActionType>>(null);
    const treeDataList = ref<TreeItem[]>([]);
    const treeLoading = ref(false);
    const OrgTitle = ref('');
    const currentNode = ref();
    const selectedKeys = ref<string[]>([]);

    function getTree() {
      const tree = unref(orgTreeRef);
      if (!tree) {
        throw new Error('tree is null!');
      }
      return tree;
    }

    const [registerOrgForm, { resetFields, }] = useForm({
      labelWidth: 100,
      schemas: orgFormSchema,
      // 弹出表单是否显示ActionButton
      showActionButtonGroup: false,
    })

    const [registerOrgModel, { openModal: openOrgModal }] = useModal();

    function createIcon({ level }) {
      if (level === 1) {
        return 'ion:git-compare-outline';
      }
      if (level === 2) {
        return 'ion:home';
      }
      if (level === 3) {
        return 'ion:airplane';
      }
      return '';
    }

    const OrgActionList: TreeActionItem[] = [
      {
        render: (node) => {
          return h(PlusOutlined, {
            class: 'ml-2',
            onClick: () => {
              handlePlusOrg(node);
            },
          });
        },
      },
      {
        render: (node) => {
          return h(EditOutlined, {
            class: 'ml-2',
            onClick: () => {
              //  编辑时候要拿到选中对象属性内容到模态框
              // setFieldsValue({ ...node });

              handleEditOrg(node);

            },
          });
        },
        show: () => true,

      },
      {
        render: (node) => {
          return h(DeleteOutlined, {
            class: 'ml-2',
            onClick: () => {
              DeleteOrgNodeMethod(node.id);
            },
          });
        },
      },
    ]
    // 组织机构数节点选中事件
    function handleSelect(keys, info) {
      getTree().setCheckedKeys([keys[0]]);
      currentNode.value = { orgname: info.selectedNodes[0].orgname, id: info.selectedNodes[0].id };
      emit('select', keys[0]);
    }

    function handlePlusOrg(node: any) {
      resetFields();
      openOrgModal(true, {
        isUpdate: false,
        currentNodeKey: node.id,
      });
    }

    function handleEditOrg(node: any) {
      console.log(node);
      getTree().setSelectedKeys([node.id.toString()]);
      const result = getTree().getSelectedNode(node.id);
      const currentValue = toRaw(node);
      openOrgModal(true, {
        isUpdate: true,
        currentNodeKey: node.id,
        node
      });
    }


    // 加载组织机构数据
    function loadOrgData() {
      treeLoading.value = true;
      // 以下是模拟异步获取数据
      setTimeout(() => {
        // 设置数据源
        treeDataList.value = cloneDeep(treeData);
        treeLoading.value = false;
      }, 2000);
    }

    // 组织机构CheckBox选择
    function handleCheck(checkedKeys, e) {
      if (checkedKeys === undefined) {
        return;
      }
      getTree().setSelectedKeys([checkedKeys[0]]);
      // 选择组织机构后操作完后重新加载用户数据
      // loadOrgData();
    }

    // 组织机构操作事件方法
    async function orghandleSuccess(data: any) {
      if (!unref(data.isUpdate)) {
        addOrgNodeMethod(data.parentKey.value, data.values);
      } else {
        EditOrgNodeMethod(data.parentKey.value, data.values);
      }
      createMessage.success('operation success');
    }

    function addOrgNodeMethod(parentKey: string, values: any) {
      getTree().insertNodeByKey({
        parentKey: parentKey,
        node: {
          orgname: values.orgname,
          id: values.id
        },
        // 往后插入
        push: 'push',
        // 往前插入
        // push:'unshift',
      })
    }

    function EditOrgNodeMethod(currentKey: string, values: any) {
      getTree().updateNodeByKey(currentKey, {
        orgname: values.orgname
      })
    }

    function DeleteOrgNodeMethod(currentKey: string) {
      getTree().deleteNodeByKey(currentKey)
    }


    // 初始化加载数据
    onMounted(() => {
      OrgTitle.value = '组织机构';
      loadOrgData();
    })

    // 页面释放
    onUnmounted(() => {
      treeDataList.value = [];
    })


    return {
      createMessage,
      orgTreeRef,
      treeDataList,
      treeLoading,
      OrgTitle,
      selectedKeys,
      OrgActionList,
      currentNode,
      registerOrgModel,
      registerOrgForm,
      orghandleSuccess,
      loadOrgData,
      handleCheck,
      handleSelect,
      createIcon,
      addOrgNodeMethod
    }
  },

});

</script>
<style lang="less" scoped>
.system_org {
  width: calc(100% - 0px);
  max-height: 800px;

  .system_org_left {
    float: left;
    margin-left: 10px;
    margin-top: 17px;
    width: 35%;
    height: 100%;
  }

  .system_org_right {
    float: right;
    width: 64%;
    height: 850px;
  }
}
</style>