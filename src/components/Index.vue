<template>
    <div class="title">
        <header>
            <div class="header1">
                <img src="http://192.168.207.72:1024/img/logo.57933597.png" alt="">

                <div class="left" :class="flag ? 'left1' : ''">

                    <div ref="xia">
                        <div class=" left-ipt">
                            <input type="text" placeholder="请输入想要的商品" v-model.trim="keyword"
                                @keyup.native.enter="search">
                        </div>
                        <button>
                            <span @click="search">
                                搜索
                            </span>
                        </button>
                    </div>

                </div>

            </div>

        </header>
        <div class="box">
            <div ref="xia" :class="flag ? 'fix' : ''">
                <ul>

                    <li>
                        <router-link to="/">首页</router-link>
                        <template v-if="!token">
                            <router-link to="/longin">登录</router-link>
                            <router-link to="/zhuce">注册</router-link>
                        </template>
                        <template v-else>
                            <!-- <router-link to="/">首页</router-link> -->
                            <router-link to="/shopList">购物车</router-link>
                            <a href="#" @click="logout">退出登录</a>
                        </template>

                    </li>


                </ul>
            </div>

        </div>
    </div>
</template>

<script>
// import { left } from '@popperjs/core';
import { mapState } from 'vuex';
import { ElMessage } from "element-plus"
export default {
    name: 'ShopIndex',

    data() {
        return {

            flag: false,
            keyword: ""
        };
    },
    computed: {
        ...mapState(["token"])
    },

    mounted() {
        window.onscroll = () => {
            var s = document.body.scrollTop || document.documentElement.scrollTop
            if (s > 100) {
                this.flag = true

            } else {
                this.flag = false
            }

        }
    },

    methods: {
        search() {
            if (!this.keyword) {
                ElMessage.warning("搜索内容不能为空");
            } else {
                //有关键字时，跳转到在搜索页
                console.log(this.$route.query.key, this.keyword)
                // 如果两次跳转的页面路径和参数相同,会报错, 搜索关键字不同时再跳转
                if (this.$route.query.key != this.keyword) {
                    this.$router.push("/search?key=" + this.keyword)
                }
            }
        },
        logout() {
            this.$store.commit("setToken", "")
            // 提示已退出
            ElMessage.success("账号已退出")
            //如果当前页面是购物车页就跳回到主页
            if (this.$route.path == "/shopList") {
                setTimeout(() => {
                    this.$route.push("/")
                }, 2000)
            }
        }


    }
}
</script>

<style lang="scss" scoped>
.title {
    box-shadow: 0 2px 6px #999;
    padding-top: 20px;
    margin-bottom: 10px;
    height: 140px;

    .fix {
        box-shadow: 0 2px 6px #999;
        width: 100%;
        top: 0;
        z-index: 22;
        position: fixed;
        background-color: white;
    }

    .left1 {
        position: fixed;
        top: 14px;
        z-index: 222;
        left: 50%
    }

    header {
        width: 1200px;
        margin: auto;
        text-align: left;

        .header1 {
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 188px;
            }

            .left {
                width: 600px;
                display: flex;
                align-items: center;
                height: 30px;



                .left-ipt {
                    width: 400px;
                    display: inline-block;

                    input:hover {
                        border-color: #c0c4cc;
                        ;
                    }

                    input {
                        width: 400px;
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        border-right: none;
                        outline: none;
                        height: 40px;
                        text-indent: 10px;
                        font-size: 14px;
                        line-height: 20px;
                        border: 1px solid rgb(221, 211, 211);
                        background-color: #fff;
                        border-radius: 4px;
                        border: 1px solid #dcdfe6;
                    }

                }

                button:hover {
                    color: purple;
                }

                button {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    height: 44px;
                    border: 1px solid;
                    margin-left: 5px;
                    background-color: #fff;

                    border: 1px solid #dcdfe6;

                    span {
                        margin-left: 5px;
                    }

                }

            }
        }
    }

    .box {
        position: static;

        ul {
            width: 1200px;
            margin: auto;
            text-align: left;
            list-style: none;
            display: flex;

            li {
                margin: 20px;
                padding: 0 10px 4px;
                font-weight: 700;
                text-decoration: none;
                color: #000;

                a {
                    padding: 18px;
                }
            }
        }
    }

}
</style>