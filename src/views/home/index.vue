<template>
    <div class="warp-content">
        <!-- 查询 -->
        <el-form :inline="true" lable="名称" :model="searchData" class="search-form">
            <el-form-item>
                <el-input v-model="searchData.title" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchData.introduce" placeholder="请输入详情"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSearch">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 列表 -->
        <el-table :data="tableList" border style="width: 100%;">
            <el-table-column prop="id" label="序号" width="180"></el-table-column>
            <el-table-column prop="title" label="名称" width="180"></el-table-column>
            <el-table-column prop="introduce" label="详情"></el-table-column>
        </el-table>
        <!-- 翻页 -->
        <el-pagination class="pagination" background layout="total, prev, pager, next, sizes" :page-size="pageData.pageSize"
            :total="pageData.dataCount" :page-sizes="[5, 10, 15, 20]" @current-change="handlerCurrentChange"
            @size-change="handlerSizeChange">
        </el-pagination>
    </div>
</template>

<script setup lang="ts">
import { getProjectList } from '@/api/project';
import { IProject } from '@/api/project/type';
import { computed, onMounted, ref } from 'vue';

// 项目列表数据
const projectList = ref<IProject[]>([]);
// 查询数据
const searchData = ref({
    title: '',
    introduce: '',
})

// 渲染数据
const renderList = ref<IProject[]>([]);

// 分页数据
const pageData = ref({
    currentPage: 1, // 当前页
    dataCount: 0,   // 数据总条数
    pageSize: 5,    // 每页条数
})

// 页码改变事件
const handlerCurrentChange = (page: number) => {
    pageData.value.currentPage = page;
}
// 每页条数改变事件
const handlerSizeChange = (size: number) => {
    pageData.value.pageSize = size;
}

// 表格数据
const tableList = computed(() => {
    return renderList.value.slice(
        (pageData.value.currentPage - 1) * pageData.value.pageSize,
        pageData.value.currentPage * pageData.value.pageSize
    )
})

// 请求项目列表数据
const queryProjectList = async () => {
    const data = await getProjectList();
    projectList.value = data;
    renderList.value = [...data];
    pageData.value.dataCount = data.length;
}

// 搜索事件
const handlerSearch = () => {
    let res: IProject[] = [];

    if (searchData.value.title || searchData.value.introduce) {
        if (searchData.value.title) {
            const titleSearchValue = projectList.value.filter(item => item.title.includes(searchData.value.title));
            res = [...res, ...titleSearchValue];
        }
        if (searchData.value.introduce) {
            const introduceSearchValue = projectList.value.filter(item => {
                const isSearch = item.introduce.includes(searchData.value.introduce);
                if (!isSearch) return false;
                const isRepeat = res.some(resItem => resItem.id === item.id);
                if (isRepeat) return false;
                return true;
            })
            res = [...res, ...introduceSearchValue];
        }
    } else {
        res = [...projectList.value];
    }

    renderList.value = res;
    pageData.value.currentPage = 1;
    pageData.value.dataCount = renderList.value.length;

}

onMounted(async () => {
    queryProjectList();
})
</script>

<style lang="less" scoped>
.wrap-content {
    display: flex;
    height: max-content;
    flex-direction: column;

    .pagination {
        display: flex;
        margin: 10px;
    }
}
</style>