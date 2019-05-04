<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户类型" prop="login_type">
      <el-radio v-model="ruleForm.login_type" label="person">个人</el-radio>
      <el-radio v-model="ruleForm.login_type" label="enterprise">企业</el-radio>
      <el-radio v-model="ruleForm.login_type" label="admin">管理员</el-radio>
    </el-form-item>
    <el-form-item label="用户名" prop="nickname">
      <el-input v-model.number="ruleForm.nickname"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="passwordword" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkpassword">
      <el-input type="passwordword" v-model="ruleForm.checkpassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" class="floatLeft">提交</el-button>
      <el-button @click="resetForm('ruleForm')" class="floatRight">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Login, LoginSession } from "../ajax";
export default {
  name: "Login",
  data() {
    var checkLoginType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户类型必须选择"));
      }
      callback();
    };
    var checkNickname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      callback();
    };
    var validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkpassword !== "") {
          this.$refs.ruleForm.validateField("checkpassword");
        }
        callback();
      }
    };
    var validatepassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkpassword: "",
        nickname: "",
        login_type: ""
      },
      rules: {
        password: [{ validator: validatepassword, trigger: "blur" }],
        checkpassword: [{ validator: validatepassword2, trigger: "blur" }],
        nickname: [{ validator: checkNickname, trigger: "blur" }],
        login_type: [{ validator: checkLoginType, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { nickname, password, login_type } = this.ruleForm;
          Login({ nickname, password, login_type }, value => {
            if (value.data.msg === "login_success") {
              LoginSession(
                { nickname, password, login_type },
                "login",
                value => {
                  if(value.data!=null){
                    window.location.href="http://localhost:3000"
                    this.$store.dispatch('setUserInformation',value.data)
                  }
                }
              );
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.demo-ruleForm {
  width: 40%;
  margin: 50px 30%;
  padding: 30px;
}
</style>
