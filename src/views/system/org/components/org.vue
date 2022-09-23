<template>
  <div class="system_org">
    <div class="system_org_left">
      <BasicTree ref="orgTreeRef" title="组织机构" helpMessage="组织机构" :treeData="treeDataList" :checkable="true"
        :loading="treeLoading" :toolbar="true" :search="true" :selectedKeys="selectedKeys" :actionList="OrgActionList"
        @select="handleSelect">
      </BasicTree>
      <!--自定义属性title和key " -->
      <!-- :fieldNames="{ title: 'orgname', key: 'id' }" -->
    </div>
    <orgModal @register="registerOrgModel" @success="orghandleSuccess"></orgModal>
    <div class="system_org_right">
      <user></user>
    </div>

  </div>
</template>
<script lang="ts">
import { defineComponent, h, onMounted, onUnmounted, ref, unref } from 'vue';
import { BasicTree, TreeActionItem, TreeActionType } from '/@/components/Tree';
import { cloneDeep } from 'lodash-es';

import { orgFormSchema, treeData } from './org.data';
import user from './user.vue';
import orgModal from './orgmodel.vue';
import { BasicModal, useModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { OrgModel } from '/@/api/system/model/orgModel';
import { rxevent } from '/@/utils/eventbus/eventaggregator.service';
import { EventKeys } from '/@/utils/eventbus/eventName';


export default defineComponent({
  name: 'orgManager',
  components: { BasicModal, BasicForm, BasicTree, user, orgModal },
  setup(_, { emit }) {

    // 消息提示组件
    const { createMessage } = useMessage();

    const orgTreeRef = ref<Nullable<TreeActionType>>(null);
    const treeDataList = ref<OrgModel[]>([]);
    const treeLoading = ref(false);
    const OrgTitle = ref('组织机构');
    const currentNode = ref();
    const selectedKeys = ref<string[]>([]);

    function getTree() {
      const tree = unref(orgTreeRef);
      if (!tree) {
        throw new Error('tree is null!');
      }
      return tree;
    }

    const [registerOrgForm, { resetFields }] = useForm({
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
              // TODO 这里对是否有子节点以及当前节点下是否有用户列表在进行是否删除
              DeleteOrgNodeMethod(node.id);
            },
          });
        },
      },
    ]
    // 组织机构数节点选中事件
    function handleSelect(keys) {
      getTree().setCheckedKeys([keys[0]]);
      currentNode.value = getTree().getSelectedNode(keys[0]);
      emit('select', keys[0]);
      // TODO 根据选中的组织机构节点加载对应的用户列表信息
      rxevent.publish(EventKeys.ORGCHOOSE, currentNode.value);
    }

    function handlePlusOrg(node: Recordable) {
      currentNode.value = getTree().getSelectedNode(node.key);
      resetFields();
      openOrgModal(true, {
        isUpdate: false,
        currentNodeKey: currentNode,
      });
    }

    function handleEditOrg(node: Recordable) {
      currentNode.value = getTree().getSelectedNode(node.key);
      // 当前的node对象中拿不到树的title属性
      openOrgModal(true, {
        isUpdate: true,
        currentNodeKey: currentNode,
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
        if (treeDataList.value.length > 0) {
          getTree().setCheckedKeys(['100100']);
          getTree().setExpandedKeys(['100100']);
          rxevent.publish(EventKeys.ORGCHOOSE, '100100');
        }
        treeLoading.value = false;
      }, 500);

    }

    // 组织机构CheckBox选择
    function handleCheck(checkedKeys, e) {
      if (checkedKeys === undefined) {
        return;
      }
      getTree().setSelectedKeys([checkedKeys[0]]);
    }

    // 组织机构操作事件方法
    async function orghandleSuccess(data: any) {
      if (!unref(data.isUpdate)) {
        addOrgNodeMethod(data.parentKey, data.values);
      } else {
        EditOrgNodeMethod(data.parentKey, data.values);
      }
      createMessage.success('operation success');
    }

    function addOrgNodeMethod(parentKey: string, values: any) {
      getTree().insertNodeByKey({
        parentKey: parentKey,
        node: {
          title: values.title,
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
        title: values.title
      })
    }

    function DeleteOrgNodeMethod(currentKey: string) {
      getTree().deleteNodeByKey(currentKey)
    }


    // 初始化加载数据
    onMounted(() => {
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

  .system_org_left {
    float: left;
    margin-left: 10px;
    margin-top: 17px;
    width: 35%;
    height: 96%;
  }

  .system_org_right {
    float: right;
    width: 64%;
    height: 96%;
  }
}
</style>