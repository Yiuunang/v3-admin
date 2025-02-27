<template>
    <el-form :inline="true" :model="searchData" class="search-form">
        <el-form-item label="用户昵称">
            <el-input v-model="searchData.nickName" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="用户角色">
            <el-select v-model="searchData.role" class="m-2" size="large" style="width: 130px">
                <el-option :key="'default'" label="全部" :value="0" />
                <el-option v-for="item in roleWithAuthList" :key="item.roleId" :label="item.roleName"
                    :value="item.roleId" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="renderList" style="width: 100%;" border>
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="nickName" label="昵称" width="180"></el-table-column>
        <el-table-column prop="role" label="角色">
            <template #default="scope">
                <el-button v-for="item in scope.row.role" :key="item.role" type="primary" size="small" link>
                    {{ item.roleName }}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="role" label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleEditUser(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog v-model="dialogVisible" title="编辑用户信息">
        <el-form :model="editUser">
            <el-form-item label="用户昵称" label-width="120px">
                <el-input v-model="editUser.nickName" class="w192" autocomplete="off" />
            </el-form-item>
            <el-form-item label="用户角色" label-width="120px">
                <el-select v-model="editUser.role" multiple class="m-2" size="large" placeholder="请选择角色"
                    style="width: 130px">
                    <el-option v-for="item in roleWithAuthList" :key="item.roleId" :label="item.roleName"
                        :value="item.roleId"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="changeInfo">
                    修改
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { getRoleList } from '@/api/role';
import { IRoleWithAuth } from '@/api/role/type';
import { getUserList } from '@/api/user';
import { IUser } from '@/api/user/type';

// 用户查询接口
interface IQueryUser {
    nickName: string; // 用户别名
    role: number; // 角色编号
}
// 用户编辑接口
interface IUserEdit {
    id: number; // 用户id
    nickName: string; // 用户昵称
    role: number[]; // 用户角色
    userName: string; // 用户名
}

// 所有用户数据
const userList = ref<IUser[]>([]);

// table 渲染数据
const renderList = ref<IUser[]>([]);

// 角色权限列表
const roleWithAuthList = ref<IRoleWithAuth[]>([]);

// 搜索数据
const searchData = reactive<IQueryUser>({
    nickName: '',
    role: 0
})

// 对话框的展示状态
const dialogVisible = ref(false);
// 编辑信息
const editUser = reactive<IUserEdit>({
    id: 0,
    nickName: '',
    role: [],
    userName: ''
});

// 查询用户数据
const handleSearch = () => {
    let res: IUser[] = [];

    if (searchData.nickName || searchData.role) {
        if (searchData.nickName) {
            const titleSearchValue = userList.value.filter(item => item.nickName.includes(searchData.nickName));
            res = [...res, ...titleSearchValue];
        }
        if (searchData.role) {
            res = searchData.nickName ? res : [...userList.value];
            res = res.filter(item => {
                return item.role.some(role => role.role === searchData.role)
            })
        }
    } else {
        res = [...userList.value];
    }
    renderList.value = res;
}

// 获取所有用户数据
const fetchUserList = async () => {
    const list = await getUserList();
    userList.value = list;
    renderList.value = [...list];
}

const fetchRoleWithAuthList = async () => {
    roleWithAuthList.value = await getRoleList();
}

// 编辑用户信息
const handleEditUser = (info: IUser) => {
    dialogVisible.value = true;
    Object.assign(editUser, {
        ...info,
        role: info.role.map(item => item.role)
    })
}

// 修改信息
const changeInfo = () => {
    dialogVisible.value = false;

    const changeObj = renderList.value.find(item => item.id === editUser.id);
    if (!changeObj) return;

    changeObj.nickName = editUser.nickName;
    changeObj.role = [];
    roleWithAuthList.value.forEach(item => {
        if (editUser.role.some(role => role === item.roleId)) {
            changeObj.role.push({
                role: item.roleId,
                roleName: item.roleName
            })
        }
    })
}

onMounted(() => {
    fetchUserList();
    fetchRoleWithAuthList();
})
</script>


<style scoped lang="less">
.search-form {
    padding: 10px 0 0 10px;
}

.w192 {
    width: 192px;
}
</style>