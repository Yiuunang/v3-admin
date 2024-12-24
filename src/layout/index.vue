<template>
    <el-container>
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="activePath" router>
                    <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
                        <span>{{ item.meta.title }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Header from './components/Header.vue';

const route = useRoute();
const router = useRouter();
const menuList = router.getRoutes().filter(item => item.meta.isShow);
const activePath = route.path;
</script>
<style lang="less" scoped>
.el-header {
    height: 60px;
    padding: 0;
    margin-bottom: 5px;
}

.el-container {
    height: calc(100vh - 65px);

    .el-menu {
        height: 100%;
    }
}
</style>