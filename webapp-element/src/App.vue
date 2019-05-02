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
        <el-menu-item index="2">校招</el-menu-item>
        <el-menu-item
          index="3"
          class="floatRight"
          v-if="this.$store.state.user.nickname==undefined"
        >
          <el-menu-item index="4">
            <router-link to="/login">登录</router-link>
          </el-menu-item>
        </el-menu-item>
        <el-submenu index="5" class="floatRight" v-if="this.$store.state.user.nickname!=undefined">
          <template slot="title">{{this.$store.state.user.nickname}}</template>
          <el-menu-item index="7-1" v-if="this.$store.state.user.login_type==='person'">个人中心</el-menu-item>
          <el-menu-item
            index="7-2"
            v-else-if="this.$store.state.user.login_type==='enterprise'"
          >企业中心</el-menu-item>
          <el-menu-item index="7-5" v-else-if="this.$store.state.user.login_type==='admin'">后台管理</el-menu-item>
          <el-menu-item index="7-3">在线交流</el-menu-item>
          <el-menu-item index="7-4" @click="logout">退出登录</el-menu-item>
        </el-submenu>
        <el-submenu index="7" class="floatRight" v-if="this.$store.state.user.nickname==undefined">
          <template slot="title">注册</template>
          <el-menu-item index="7-1">个人</el-menu-item>
          <el-menu-item index="7-2">企业</el-menu-item>
        </el-submenu>
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
import { LoginSession } from "./ajax";
export default {
  name: "app",
  components: { Footer },
  data() {
    return {
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {},
    logout() {
      LoginSession({}, "delete", value => {
        if (value.data != null) {
          this.$store.dispatch("setUserInformation", value.data);
        }
      });
    }
  },
  mounted: function() {
    LoginSession({}, "refresh", value => {
      if (value.data != null) {
        this.$store.dispatch("setUserInformation", value.data);
      }
    });
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




