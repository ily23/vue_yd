<template>
    <el-footer height="auto">
        Проект | {{new Date().getFullYear()}}
    </el-footer>
</template>


<script>
export default {
    name: 'Footer'
}
</script>

<style lang="scss" scoped>
    .el-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>

