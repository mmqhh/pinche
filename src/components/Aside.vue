<template>
  <el-menu id="aside-menu" :default-active="$route.path" mode="vertical">
    <router-link to="/start">
      <el-menu-item index="1-1">
        <i class="el-icon-circle-plus-outline"></i>
        发起拼车
      </el-menu-item>
    </router-link>
    <router-link to="/find">
      <el-menu-item index="1-2">
        <i class="el-icon-search"></i>
        寻找拼车
      </el-menu-item>
      <!-- @click="$router.push('/find')" -->
    </router-link>
    <router-link to="/record">
      <el-menu-item index="1-3">
      <i class="el-icon-tickets"></i>
      拼车记录
    </el-menu-item>
    </router-link>
    <router-link to="/user-management">
    <el-menu-item index="1-4">
      <i class="el-icon-info"></i>
      用户管理
    </el-menu-item>
    </router-link>
  </el-menu>
</template>

<script>
  export default {
    name: "Aside",
    data() {
      return {};
    },
    methods: {
      onStart() {
        //在任何组件内通过this.$router访问路由实例，也可以通过this.$route访问当前路由信息
        this.$router.push("/start"); //$router是VueRouter实例，包含push,replace,go,beforeEach等等方法
      } //$route是路由信息对象，包含path,params,query,name等信息
    }
  };
</script>

<style scoped>
  #aside-menu {
    font-weight: bold;
    font-size: 20px;
    vertical-align: middle;
  }
</style>