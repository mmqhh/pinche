<template>
  <div>
    <el-container  id="main-container">
      <el-header>
          <my-header></my-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <my-Aside></my-Aside>
        </el-aside>
        <el-container>
          <el-main>
            <keep-alive>
              <p v-if="this.$route.path==='/'">这是主页</p>
              <router-view style="width:80%" v-else></router-view>
            </keep-alive>
          </el-main>
      <el-footer>
          <my-footer></my-footer>
      </el-footer>
      </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myAside from '@/components/Aside'
import myFooter from '@/components/Footer'
import myHeader from '@/components/Header'
export default {
  name: "Index",
  data() {
    return {
      
    };
  },
  components:{
      myAside,
      myFooter,
      myHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
    /* background: linear-gradient(to top left, #00c6ff, #0072ff); */
    /* background: linear-gradient(to right, #606c88, #3f4c6b); */
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
.el-footer {
    /* background: linear-gradient(to top left, #00c6ff, #0072ff); */
    /* background: linear-gradient(to right, #606c88, #3f4c6b); */
    background-image: linear-gradient(225deg, #667eea 0%, #764ba2 100%);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    /* background: #545c64; */
    background-image: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%);    
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  #main-container{
    min-height: 100vh;
  }
</style>
