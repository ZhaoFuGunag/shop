<template>
    <div class="box">
        <div class="user">
            <el-input type="text" placeholder="请输入用户名" @focus="userErr = ''" v-model="userName" :suffix-icon="User">
            </el-input>
            <span class="err" v-show="userErr">{{ userErr }}</span>
        </div>
        <div class="ge"></div>
        <div class="psd">
            <el-input type="text" placeholder="密码" @focus="pwdErr1 = ''" v-model="password1" :suffix-icon="Key">
            </el-input>
            <span class="err" v-show="pwdErr1">{{ pwdErr1 }}</span>
        </div>
        <div class="ge"></div>
        <div class="shi">
            <el-input type="text" placeholder="确认密码" v-model="password2" :suffix-icon="Key">
            </el-input>
            <span class="err" v-show="pwdErr2">{{ pwdErr2 }}</span>
        </div>
        <button @click="resgister" :plain="true">注册</button>
    </div>
</template>
<script setup>
import { User, Key } from "@element-plus/icons-vue"
</script>
<script>
import { getZhuce } from "../tools/ajax.js"

import { ElInput, ElMessage } from "element-plus"
export default {
    name: 'ShopZhuce',

    data() {
        return {
            userName: "",
            password1: "",
            password2: "",
            // txt2: "",
            userErr: "",
            pwdErr1: "",
            pwdErr2: ""
        };
    },

    mounted() {

    },
    created() {

    },

    methods: {
        async resgister() {
            //用户名正则验证
            var user = /^[\w\u4e00-\u9fa5]{6,12}$/;
            if (!user.test(this.userName)) {
                this.userErr = "只能包含数字、字母、下划线、汉字6-12位";
                return false;
            }
            // 密码正则验证
            var psd = /^\w{6,12}$/;
            if (!psd.test(this.password1)) {
                this.pwdErr1 = "只能包含数字、字母、下划线、汉字6-12位";
                return false;

            }
            //确认密码
            if (this.password1 != this.password2) {
                this.pwdErr2 = '两次输入的密码不一致';
                return false;
            }
            var res = await getZhuce({
                "userName": this.userName,
                "password": this.password1
            })
            if (res.code == 0) {
                ElMessage.warning('用户名被占用')
                this.userName = this.userErr = this.password = this.pwdErr = "";
            } else {
                ElMessage.success("注册成功，赶快去登录吧")
                setTimeout(() => {
                    this.$router.push("/longin");
                    this.userName = this.userErr = this.password = this.pwdErr = "";
                }, 1000)
            }

        }
    },
};
</script>


<style lang="scss" scoped>
.box {
    margin: 100px auto;
    width: 400px;

    .err {
        color: red;
        font-size: 12px;
        // margin-top: 10px;
    }

    .user {
        display: flex;
        align-items: center;

        p {
            width: 100%;
            font-size: 12px;
            color: red;

        }

        span {
            position: absolute;
            height: 80px;
            z-index: -1;

        }

        input {
            width: 400px;
            height: 30px;
            text-indent: 20px;
            outline: none;
            border: 1px solid rgb(121, 116, 116);
            border-radius: 3px;
        }
    }

    .ge {
        height: 20px;
    }

    .psd {
        display: flex;
        align-items: center;

        span {
            position: absolute;
            height: 65px;
            z-index: -1;
        }

        input {
            width: 400px;
            height: 30px;
            text-indent: 20px;
            outline: none;
            border: 1px solid rgb(121, 116, 116);
            border-radius: 3px;
        }

    }

    .shi {
        display: flex;
        align-items: center;

        span {
            position: absolute;
            height: 80px;
            z-index: -1;
        }

        input {
            width: 400px;
            height: 30px;
            text-indent: 18px;
            outline: none;
            border: 1px solid rgb(121, 116, 116);
            border-radius: 3px;
        }
    }

    button {
        width: 400px;
        margin-top: 21px;
        color: white;
        height: 37px;
        background-color: #67C23A;
        border-radius: 5px;
        border: 1px;
    }

}
</style>