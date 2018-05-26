<template>
    <div>
        <el-dialog title="拼车详情" @close="closeDialog" :visible.sync="showDialog" width="35%">
            <el-form>
                <el-form-item label="订单号" label-width="120px">
                    {{orderDetail.oid}}
                </el-form-item>
                <el-form-item label="目的地" label-width="120px">
                    {{orderDetail.dest}}
                </el-form-item>
                <el-form-item label="出发时间" label-width="120px">
                    {{orderDetail.startTime}}
                </el-form-item>
                <el-form-item label="结束时间" label-width="120px">
                    {{orderDetail.endTime}}
                </el-form-item>
                <el-form-item label="有部门经理" label-width="120px">
                    {{orderDetail.hasManager}}
                </el-form-item>
                <el-form-item label="拼车人员" label-width="120px">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column align="center" prop="dept" label="部门"></el-table-column>
                        <el-table-column align="center" prop="username" label="拼车人"></el-table-column>
                        <el-table-column align="center" prop="phone" label="手机"></el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">返 回</el-button>
                <el-button type="danger" @click="quitPinche" v-if="buttonToShow">退出拼车</el-button>
                <el-button type="primary" @click="joinPinche" v-else>加入拼车</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getPeople, join, quit } from "./../api/pin";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      buttonToShow: null,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close"); // 点击取消按钮，触发OrderDeatail组件的close事件
    },
    getPeopleList(oid) {
      getPeople(oid)
        .then(res => {
          this.tableData = res.data.userInfoList;
          let nameList = [];
          for (let i of this.tableData) {
            nameList.push(i.username);
          }
          if(nameList.includes(this.username)){
              this.buttonToShow = true
          }else{
              this.buttonToShow = false;
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    joinPinche() {
      let uid = this.uid;
      let oid = this.orderDetail.oid;
      join(oid, uid)
        .then(res => {
          this.$emit("refreshList");
          this.$message.success("加入拼车成功！");
          // this.closeDialog();
          this.getPeopleList(this.orderDetail.oid);
        })
        .catch(err => {
          if (err === "Validation error") {
            this.$message.error("加入拼车失败！您已在此拼车订单内。");
          } else {
            this.$message.error("加入拼车失败！" + err);
          }
        });
    },
    quitPinche() {
      let uid = this.uid;
      let oid = this.orderDetail.oid;
      quit(oid, uid)
        .then(res => {
          this.$emit("refreshList");
          this.$message.success("退出拼车成功！");
          // this.closeDialog();
          this.getPeopleList(this.orderDetail.oid);
        })
        .catch(err => {
          if (err === "Validation error") {
            this.$message.error("退出拼车失败！您不在此拼车订单内。");
          } else {
            this.$message.error("退出拼车失败！" + err);
          }
        });
    }
  },
  computed: {
    showDialog: {
      get: function() {
        return this.detailDialogVisible;
      },
      set: function(v) {
        // 为了去掉computed属性没有setter的告警而写的，没实际作用
        return v;
      }
    },
    orderDetail() {
      return this.orderInfo;
    },
    ...mapState(["uid", "username"]) // 从Vuex获取uid
  },
  props: ["detailDialogVisible", "orderInfo"]
};
</script>

<style scoped>
</style>