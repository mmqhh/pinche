<template>
  <div id="login-page">
      <div id="login-wrap">
          <h1>移快拼车</h1>
          <h2>在线拼车平台</h2>
          <div id="input-section">
              <el-input id="login-username" placeholder="用户名" v-model="userinfo.username"></el-input>
              <el-input id="login-password" type="password" placeholder="密码" v-model="userinfo.password" @keyup.native.enter="onLogin"></el-input>
          </div>
          <div id="btn">
              <el-button id="login-btn" v-bind="{'disabled': disable}" type="primary" @click="onLogin" :loading="loading">登录</el-button>
          </div>
          <div id="signup" @click="dialogVisible = true">
            <span>还没有帐号？戳我注册！</span>
          </div>
      </div>
      <el-dialog title="注册帐号" :visible.sync="dialogVisible" width="30%">
          <el-form :model="signUpform" :rules="rules"  status-icon ref="SignUp">
            <el-form-item label="用户名" label-width="120px" prop="username">
              <el-input v-model.trim="signUpform.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="120px" prop="password">
              <el-input type="password" v-model.trim="signUpform.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="120px" prop="check_password">
              <el-input type="password" v-model.trim="signUpform.check_password"></el-input>
            </el-form-item>
          <el-form-item label="所属部门" label-width="120px"  prop="dept">
              <el-select v-model="signUpform.dept" placeholder="请选择所属部门">
                <el-option v-for="item in deptOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="手机号码" label-width="120px" prop="phone">
              <el-input v-model.trim="signUpform.phone"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm" >重 置</el-button>
          <el-button type="primary" @click="submitSignUpForm">提 交</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { login , signUp } from "@/api/login";
import MD5 from 'crypto-js/md5'
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.signUpform.check_password !== '') {
            this.$refs.SignUp.validateField('check_password');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.signUpform.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      userinfo: {
        username: "",
        password: ""
      },
      signUpform: {
        username: "",
        password: "",
        check_password:"",
        dept: "",
        phone:""
      },
      deptOptions: [
        {
          value: "综合部",
          label: "综合部"
        },
        {
          value: "人力资源部",
          label: "人力资源部"
        },
        {
          value: "财务部",
          label: "财务部"
        },
        {
          value: "党委办公室",
          label: "党委办公室"
        },
        {
          value: "工会",
          label: "工会"
        },
        {
          value: "市场部",
          label: "市场部"
        },
        {
          value: "政企客户部",
          label: "政企客户部"
        },
        {
          value: "网络部",
          label: "网络部"
        },
        {
          value: "客户响应中心",
          label: "客户响应中心"
        },
        {
          value: "行政服务中心",
          label: "行政服务中心"
        },
        {
          value: "网络管理中心",
          label: "网络管理中心"
        },
        {
          value: "无线优化中心",
          label: "无线优化中心"
        },
        {
          value: "工程建设中心",
          label: "工程建设中心"
        },
        {
          value: "业务支持中心",
          label: "业务支持中心"
        }
      ],
      loading: false,
      disable: false,
      dialogVisible: false,
      
      rules:{
        username:[
          // { required: true, message: '请输入真实名字', trigger: 'blur' },
          {type: "string", required: true, pattern: /^[\u4e00-\u9fa5]+$/ , message: '请输入真实名字'},
          { min: 2, max: 3, message: '长度在 2 到 3 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true , message: '请输入密码'},
          { validator: validatePass, trigger: 'blur' }
        ],
        check_password:[
          { required: true , message: '请确认密码'},
          { validator: validatePass2, trigger: 'blur' }
        ],
        dept:[
          { required: true, message: '请选择所属部门', trigger: 'change' }
        ],
        phone:[
          {type: "string", required: true, pattern: /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/ , message: '请输入手机号码'}
        ]
      }
    };
  },
  methods: {
    onLogin() {
      let loginForm = Object.assign({},this.userinfo);
      loginForm.password = MD5(loginForm.password).toString();
      this.disable = true;
      this.loading = true;
      this.$store
        .dispatch("Login", loginForm)
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err);
          setTimeout(() => {
            this.disable = false;
          }, 5000);
        });
    },
    submitSignUpForm() {
        this.$refs['SignUp'].validate((valid) => {
          if (valid) {
            let newSignUpform = Object.assign({},this.signUpform);
            newSignUpform.password = MD5(newSignUpform.password).toString();
            newSignUpform.check_password = MD5(newSignUpform.check_password).toString();
            signUp(newSignUpform).then(res=>{
              if (res.data.status === 'success') {
                this.dialogVisible = false;
                this.$message.success('注册成功！请登录。');
                this.userinfo.username = this.signUpform.username;
                this.userinfo.password = this.signUpform.password;
                this.$refs['SignUp'].resetFields();
              }else{
                this.$message.error(res.data.msg);
              }
            }).catch(err=>{
              this.$message.error(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['SignUp'].resetFields();
      }
  }
};
</script>

<style>
#login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
#login-wrap {
  width: 400px;
  flex: 0;
  flex-direction: row;
  padding: 50px;
  border: 1px solid #ddd;
  background: #e9eef3;
}
#login-wrap h1,
#login-wrap h2 {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
#btn {
  text-align: center;
  margin-top: 20px;
}
#input-section {
  text-align: center;
  width: 300px;
  margin: 0 auto;
}
#login-username,
#login-password {
  margin: 10px auto;
}
#btn #login-btn {
  display: block;
  margin: auto;
  width: 300px;
}
#signup {
  margin-top: 20px;
  font-size: 12px;
  text-align: right;
  color: royalblue;
  cursor: pointer;
}
</style>
