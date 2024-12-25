<template>
    <el-form label-width="100px">
        <el-form-item>
            <el-button type="primary" @click="onAddRole">新增角色</el-button>
        </el-form-item>
    </el-form>
    <!-- table -->
    <el-table :data="roleList" border style="width: 100%;">
        <el-table-column prop="roleId" label="角色id" width="180px"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180px"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" size="small" @click="onChangeAuth(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>


<script setup lang="ts">
import { getRoleList } from '@/api/role';
import { IRoleWithAuth } from '@/api/role/type';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 角色信息
const roleList = ref<IRoleWithAuth[]>([]);

// 获取角色列表
const fetchRoleList = async () => {
    const list = await getRoleList();
    roleList.value = list;
}

// 修改权限
const onChangeAuth = (row: IRoleWithAuth) => {
    router.push({
        path: 'auth',
        query: {
            id: row.roleId,
            auth: row.authority,
        }
    })
}

// 添加角色
const onAddRole = () => {
    ElMessageBox.prompt(
        '请输入角色名称',
        '添加角色',
        {
            confirmButtonText: 'confirm',
            cancelButtonText: 'cancel',
        }
    ).then(({ value, action }) => {
        if (value) {
            roleList.value.push({
                roleId: roleList.value.length + 1,
                roleName: value,
                authority: []
            });
            ElMessage({
                type: 'success',
                message: `${value}添加成功`
            })
        }
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: `点击了取消按钮`
        })
    })
}

onMounted(() => {
    fetchRoleList();
})
</script>