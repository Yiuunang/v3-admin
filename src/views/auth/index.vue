<template>
    authPage
    <el-tree ref="treeRef" style="max-width: 600px" show-checkbox :data="authList" node-key="roleId"
        :default-checked-keys="checkedNode" :props="{
            label: 'name',
            children: 'roleList'
        }"></el-tree>
    <el-button type="primary" @click="onChangeAuth">修改节点</el-button>
</template>

<script setup lang="ts">
import { getAuthList } from '@/api/ayth';
import { IAuth } from '@/api/ayth/type';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// 选中的节点
const checkedNode = ref<number[]>([]);

const route = useRoute();
const { query } = route;
if (query?.auth) {
    checkedNode.value = (query as any).auth as number[];
}

const treeRef = ref();


// 权限列表
const authList = ref<IAuth[]>([]);

// 获取权限列表
const fetchAuthList = async () => {
    const list = await getAuthList();
    authList.value = list;
}

// 修改节点
const onChangeAuth = () => {
    const selectedNode = treeRef.value.getCheckedNodes();
    const selectedKeys = treeRef.value.getCheckedKeys();

    console.warn(selectedNode, selectedKeys);

}

onMounted(() => {
    fetchAuthList();
})
</script>