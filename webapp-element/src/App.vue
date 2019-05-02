<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <router-link to="/index">首页</router-link>
        </el-menu-item>
        <el-menu-item index="1">校招</el-menu-item>
        <el-submenu index="2">
          <template slot="title">注册</template>
          <el-menu-item index="2-1">个人</el-menu-item>
          <el-menu-item index="2-2">企业</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <el-menu-item index="1">
            <router-link to="/login">登录</router-link>
          </el-menu-item>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer>
      <Footer/>
    </el-footer>
  </el-container>
</template>
<script>
import Footer from "./component/footer";

export default {
  name: "app",
  components: { Footer },
  data() {
    return {
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {}
  }
};
</script>
<style>
.el-header,
.el-main,
.el-footer {
  padding: 0;
}
</style>




