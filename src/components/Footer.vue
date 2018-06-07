<template>
    <div>
        <div id="footer">
            <span>Copyright © 2018 mmqhh  版权所有</span>
            <br>
            <span id="tel">联系电话: </span>
            <span id="email">电子邮箱: </span>
            <div id="wechat" @click="dialogTableVisible=true">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-wechat">
                    </use>
                </svg>
            </div>
            <a href="https://github.com/mmqhh/pinche" target="_blank">
                <div id="github">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-GitHub"></use>
                    </svg>
                </div>
            </a>
        </div>
        <el-dialog :visible.sync="dialogTableVisible" width="300px">
                <h2>扫码加平台作者微信</h2>
                <img src="@/assets/myQRcode.jpg" width="224px" height="298px">
              </el-dialog>
    </div>

    <!-- <div id="footer">
      <span>Copyright © 2018 mmqhh 版权所有</span>
      <br>
      <span id="tel">联系电话: </span>
      <span id="email">电子邮箱: @</span>
  </div> -->
</template>

<script>

    export default {
        name: "Footer",
        data(){
            return {
                dialogTableVisible: false
            }
        },
    };
</script>

<style scoped>
    #footer {
        line-height: 30px;
        color: #ffffff;
        font-family: "Microsoft YaHei";
        position: relative;
        clear: both;
    }

    #tel {
        margin-right: 20px;
    }

    #github {
        line-height: 30px;
        color: #ffffff;
        right: 50px;
        display: inline-block;
        position: absolute;
    }

    #wechat {
        line-height: 30px;
        color: #ffffff;
        right: 75px;
        display: inline-block;
        position: absolute;
        cursor: pointer;
    }
</style>