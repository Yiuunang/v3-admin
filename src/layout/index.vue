<template>
    <el-container>
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="activePath" router>
                    <template v-for="item in menuList" :key="item.path">
                        <el-menu-item v-if="!item.children" :index="item.path">
                            <span>{{ item.meta!.title }}</span>
                        </el-menu-item>
                        <el-sub-menu v-else :index="item.path">
                            <template #title>
                                <span>{{ item.meta!.title }}</span>
                            </template>
                            <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
                                <span>{{ child.meta!.title }}</span>
                            </el-menu-item>
                        </el-sub-menu>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
                <el-breadcrumb :separator-icon="ArrowRight">
                    <el-breadcrumb-item v-for="item in setttingStore.routeInfo" :key="item.name" :to="{ name: item.name }">
                        {{ item.title }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Header from './components/Header.vue';
import { useSettingStore } from '@/store/modules/setting';
import { ArrowRight } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const menuList = router.options.routes[2].children?.filter(item => item.meta?.isShow);
const activePath = route.path;

const setttingStore = useSettingStore();
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

.el-breadcrumb {
    margin-bottom: 10px;
}
</style>