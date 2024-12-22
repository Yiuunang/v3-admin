<template>
    <div class="login-box">
        <div class="login-form">
            <h1 class="login-title">企业中后台管理系统</h1>
            <el-form :model="userInfo" :rules="rules" show-message class="login-info">
                <el-form-item prop="username">
                    <el-input v-model="userInfo.username" type="text" :prefix-icon="User"
                        placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="userInfo.password" type="password" :prefix-icon="Lock"
                        placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="userLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { User, Lock } from "@element-plus/icons-vue"
import useUserStore from '@/store/modules/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const userInfo = ref({
    username: '',
    password: '',
});

const rules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
})

const userLogin = () => {
    userStore.storeUserLogin(userInfo.value).then(() => { 
        router.push('/');
    });
}
</script>

<style lang="less" scoped>
.login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: var(--lj-color-main);

    h1 {
        font-size: 30px;
        margin-bottom: 20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        user-select: none;
    }


    .login-form {
        display: flex;
        width: 300px;
        text-align: center;
        flex-direction: column;

        .login-info {
            height: max-content;
        }
    }
}
</style>