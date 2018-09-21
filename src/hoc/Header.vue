<template>
  <el-header>
    <el-row type="flex" justify="space-between">
      <el-col :span="24">
        <el-menu mode="horizontal" router="true">
          <el-menu-item v-for="({path, name}, i) of menu" :index="path" :key="i">
            {{name}}
          </el-menu-item>
        </el-menu>
      </el-col>

      <!-- <el-col :span="2">
        <el-button icon="el-icon-setting" circle></el-button>
      </el-col> -->
    </el-row>
  </el-header>
</template>

<script>
  
  export default {
    name: 'Header',
    data(){
      return{
        menu: this.$store.state.routes
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
