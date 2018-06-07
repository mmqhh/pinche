<template>
  <div id="header">
      <div id="logo" @click="$router.push('/')">移快拼车-在线拼车平台</div>
      <div id="user-info">
          <span id="username">{{dept}}-{{username}}</span>
          <span id="logout" @click="onLogout">退出</span>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { remove_token } from "@/utils/auth";
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    onLogout() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("Logout").then(() => {
            this.$message.success("成功退出");
            this.$router.push("/login");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  },
  computed: {
    //从Vuex获取的数据
    ...mapState(["username", "dept"])
  }
};
</script>

<style>
#header {
  position: relative;
  color: #ffffff;
}
#logo {
  position: absolute;
  left: 20px;
  cursor: pointer;
  font-size: 30px;
  font-weight: bold;
}
#user-info {
  position: absolute;
  right: 20px;
  font-weight: bold;
}
#username {
  margin-right: 20px;
}
#logout {
  cursor: pointer;
}
</style>
