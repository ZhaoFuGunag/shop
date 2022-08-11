<template>
  <div class="about">
    <div class="user">

      <!-- 用户名 -->
      <el-input type="text" placeholder="用户名" v-model="userName" @focus="userErr = ''" :suffix-icon="User">
      </el-input>
      <span class="err" v-show="userErr">{{ userErr }}</span>
    </div>
    <div class="gao"></div>
    <div class="psd">
      <!-- 密码 -->
      <el-input type="text" placeholder="密码" v-model="password" @focus="pwdErr = ''" :suffix-icon="Key">
      </el-input>
      <span class="err" v-show="pwdErr">{{ pwdErr }}</span>
    </div>
    <button @click="longin">登录</button>
  </div>
</template>
<script setup>
import { User, Key } from "@element-plus/icons-vue"
</script>
<script>
import { mapState, mapMutations } from 'vuex'
import { getLogin } from "../tools/ajax.js"
import { ElButton, ElInput, ElMessage } from "element-plus"
export default {
  data() {
    return {
      userName: "",
      password: '',
      userErr: "",
      pwdErr: ""
    }
  },

  // computed: {
  //   ...mapState(["token"])
  // },
  methods: {

    longin() {

      // 账号正则验证
      var patt = /^[\w\u4e00-\u9fa5]{6,12}$/;
      if (!patt.test(this.userName)) {
        this.userErr = "只能包含数字、字母、下划线、汉字6-12位";
        return false;
      }
      var patt2 = /^\w{6,12}$/;
      // 密码正则验证
      if (!patt2.test(this.password)) {
        this.pwdErr = "只能包含数字、字母、下划线6-12位";
        return false;
      }
      // 执行登录
      getLogin({
        "userName": this.userName,
        "password": this.password
      }).then(res => {
        if (res.code) {
          // 登录成功后把获得的token值提交给vuex状态管理仓库store统一管理
          this.$store.commit("setToken", res.token);
          ElMessage.success("登录成功,欢迎" + res.userName)

          setTimeout(() => {
            // this.$router.push("/")   //有历史记录
            this.$router.replace("/"); //没有历史记录
            // this.$router.back()
          }, 1000)

        } else {
          ElMessage.success("用户名或密码错误")
        }
        // 界面清空
        this.userName = this.userErr = this.password = this.pwdErr = "";
      })

    }
  },
}
</script>
<style scoped>
.about {
  width: 400px;
  margin: 80px auto;

}

.user {
  width: 100%;
  display: flex;
  align-items: center;




}

.user p {
  width: 100%;
  font-size: 12px;
  color: red;

}

.user span {
  position: absolute;
}

.user input:hover {
  border-color: #c0c4cc;
}

.user input {
  width: 400px;
  height: 30px;
  text-indent: 25px;
  outline: none;
  border-radius: 3px;
  border: 1px solid rgb(179, 179, 179);
}

.gao {
  height: 20px;
}

.psd {
  display: flex;
  align-items: center;
  position: relative;

}

.psd span {
  position: absolute;
}

.psd input:hover {
  border-color: #c0c4cc;
}

.psd input {
  width: 400px;
  height: 30px;
  text-indent: 25px;
  outline: none;
  border-radius: 3px;
  border: 1px solid rgb(171, 171, 171);
}

button {
  border: 1px;
  border-radius: 5px;
  width: 400px;
  height: 40px;
  margin-top: 20px;
  background-color: #85CE61;
  color: white;
}
</style>