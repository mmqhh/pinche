<template>
<div>
  <div id="head">
    <span id="title">发起拼车</span>
    <span id="tips">&emsp;&emsp;先寻找拼车，若无合适车次，再发起拼车</span>
    <hr>
  </div>
  <el-form ref="forms" :model="form" label-width="110px">
  <el-form-item label="目的地">
      <el-col :span="10">
    <el-cascader placeholder="请选择目的地" v-model="form.dest" :options="destOptions" :show-all-levels="false"></el-cascader>
    </el-col>
  </el-form-item>
  <el-form-item label="出发时间">
    <el-col :span="10">
      <el-date-picker type="datetime" format="yyyy-M-d HH:mm" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="结束时间">
    <el-col :span="10">
      <el-date-picker type="datetime" format="yyyy-M-d HH:mm" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="是否有部门经理">
    <el-col :span="10">
      <el-switch v-model="form.hasManager"></el-switch>
    </el-col>
  </el-form-item>
  <el-form-item label="拼车发起人">
    <el-col :span="10">
      <el-input  :disabled="true" :value="userinfo"></el-input>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-col :span="6">
    <el-button type="primary" @click="onSubmit" :loading="loading" :disabled="disable">发起拼车</el-button>
    </el-col>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import { mapState } from "vuex";
import { startNewOrder } from "./../api/pin";
export default {
  computed: {
    ...mapState(["username", "dept","uid"]),
    userinfo() {
      return `${this.dept}-${this.username}`;
    }
  },
  data() {
    return {
      loading: false,
      disable: false,
      form: {
        startTime: "",
        endTime: "",
        dest: [],
        hasManager: false,
        num:1,
        valid: false
      },
      destOptions: [
        {
          value: "市内",
          label: "市内",
          children: [
            {
              value: "茂南",
              label: "茂南"
            },
            {
              value: "电白",
              label: "电白"
            },
            {
              value: "高州",
              label: "高州"
            },
            {
              value: "化州",
              label: "化州"
            },
            {
              value: "信宜",
              label: "信宜"
            }
          ]
        },
        {
          value: "市外",
          label: "市外",
          children: [
            {
              value: "广州",
              label: "广州"
            },
            {
              value: "深圳",
              label: "深圳"
            },
            {
              value: "肇庆",
              label: "肇庆"
            },
            {
              value: "珠海",
              label: "珠海"
            },
            {
              value: "湛江",
              label: "湛江"
            }
          ]
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      this.loading = true;
      this.disable = true;
      this.form.applicant = this.userinfo;

      startNewOrder(this.form , this.uid)
        .then(res => {
          setTimeout(() => {
            this.disable = false;
          }, 5000);
          this.loading = false;
          this.$message.success("发起拼车成功！");
          this.form = {
            startTime: "",
            endTime: "",
            dest: [],
            hasManager: false,
            num: 1,
            valid: false
          };
        })
        .catch(err => {
          setTimeout(() => {
            this.disable = false;
          }, 5000);
          this.loading = false;
          this.$message.error("发起拼车失败！" + err);
          this.form = {
            startTime: "",
            endTime: "",
            dest: [],
            hasManager: false,
            num: 1,
            valid: false
          };
        });
    }
  }
};
</script>

<style scoped>
#head{
  line-height: 50px;
  text-align: left;
  font-size: 30px;
}
#tips{
    font-size: 14px;
  }
hr{
  margin-bottom: 20px;
}
</style>
