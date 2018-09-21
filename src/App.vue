<template>
    <el-container direction="vertical" id="app">
      <Header />
      <Content />
      <Footer />
    </el-container>
</template>

<script>
import Header from './hoc/Header.vue'
import Footer from './hoc/Footer.vue'
import Content from './hoc/Content.vue'

export default {
  name: 'app',
  components: {
    Header,
    Content,
    Footer
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
  }

  .el-container {
    min-height: 100vh;
  }
</style>
