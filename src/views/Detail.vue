<template>
    <div class="box">
        <div class="btn">
            <el-button color="#626aef" style="width: 100px;" :dark="isDark" @click="$router.back()">后退</el-button>
        </div>

        <div class="left">
            <div class="wrap" ref="wrap">
                <div class="big" v-show="flag">
                    <img :src="imgs[num]" :style="{ marginLeft: bigObj.l + 'px', marginTop: bigObj.t + 'px' }" alt="">
                </div>
                <div class="middle" @mousemove="move" @mouseover="flag = true" @mouseout="flag = false">
                    <img :src="imgs[num]" alt="">
                    <div v-show="flag" class="mark" :style="{ left: markObj.l + 'px', top: markObj.t + 'px' }"></div>
                </div>
                <div class="small">
                    <img v-for="(url, index) in imgs" @click="num = index" :key="url" :src="url" alt=""
                        :class="index == num ? 'active' : ''">
                </div>
            </div>
            <!-- 右侧商品详情页 -->
            <div class="rightshop">
                <div class="goods">
                    <h2>{{ arr.title }}</h2>
                    <p>{{ arr.supplier }}</p>
                    <p>{{ '￥' + arr.priceStr }}</p>
                    <div class="xing">
                        <div class="demo-rate-block">

                            <el-rate v-model="value1" />
                        </div>
                        <span>{{ value1 }}</span>
                    </div>

                    <div class="niu">
                        <el-row class="mb-4">
                            <el-button type="danger" plain style="padding: 20px 60px; " @click="add()">添加购物车</el-button>
                        </el-row>
                    </div>
                </div>

            </div>
        </div>
        <!-- 相似商品推荐 -->
        <div class="tuijian">
            <p>
                相似商品推荐
            </p>
            <div class="list">
                <goodList :list1="sameList"></goodList>
                <!-- <li v-for="item in sameList" @click="">
                    <img :src="item.imageUrl" alt="">
                    <h2>{{ item.title }}</h2>
                    <div>
                        <span>{{ '￥' + item.priceStr }}</span>
                        <div v-html="item.mack"></div>
                    </div>
                </li> -->
            </div>

            <div v-for="item in descriptionImage" style="text-align: center;">
                <img :src="item" alt="">
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { isDark } from '@element-plus/icons-vue'

const value1 = ref(3.0)

</script>
<script>

// import { json } from "stream/consumers";
import { getDetail, SameList, getCartAdd } from "../tools/ajax.js"
import goodList from '@/components/goodList';
import { mapState } from 'vuex';
import { ElMessage } from "element-plus"
var that = null
export default {
    name: 'WorkspaceJsonDetail',
    components: { goodList },
    data() {
        return {
            descriptionImage: [],
            arr: '',
            goods: {},
            // 相似商品
            sameList: [],
            value1: 3.5,
            imgs: [],
            num: 0,
            flag: false,
            markObj: {
                l: 0,
                t: 0
            },
            bigObj: {
                l: 0,
                t: 0
            },
            title: ""
        }
    },
    computed: {
        ...mapState(["token"])
    },
    created() {
        this.getGoodsData(this.$route.query.id)
        that = this
    },
    beforeRouteUpdate(to, next) {
        that.getGoodsData(to.query.id)
        document.documentElement.scrollTop = 0
        next()
    },
    methods: {
        // 请求当前商品详情数据
        getGoodsData(id) {
            getDetail({
                goodId: id
            }).then(res => {
                this.imgs = JSON.parse(res[0].imgs).slice(1, 6)
                this.arr = res[0]
                // console.log(res, 12332123);
                // 请求相似商品
                this.title = res[0].supplier
                this.descriptionImage = JSON.parse(res[0].descriptionImage)
                this.getSimilarity();
            })
        },
        // 请求相似商品的函数
        getSimilarity() {
            SameList({
                supplier: this.title
            }).then(res => {
                // console.log(res)
                this.sameList = res
            })
        },
        // 放大镜
        move(e) {

            let x = e.clientX - this.$refs.wrap.offsetLeft;
            let y = e.clientY + (document.body.scrollTop || document.documentElement.scrollTop) - this.$refs.wrap.offsetTop;

            if (x < 100) {
                x = 100;
            }
            if (x > 300) {
                x = 300;
            }
            if (y < 100) {
                y = 100;
            }
            if (y > 300) {
                y = 300
            }

            this.markObj = {
                l: x - 100,
                t: y - 100
            }
            this.bigObj = {
                l: -(x - 100) * 2,
                t: -(y - 100) * 2
            }
        },
        // 添加购物车函数
        add() {
            if (this.token) {
                console.log(this.arr.Id, this.token);
                //发送购物车请求
                getCartAdd({
                    goodId: this.arr.Id,
                    token: this.token
                }).then(res => {
                    console.log(res.code);
                    if (res.code == 0) {
                        ElMessage.warning("登录过期，即将跳转到登录页")
                        setTimeout(() => {
                            this.$route.push("/longin")
                        }, 2000);
                    } else if (res.code == 1) {
                        ElMessage.success("添加成功")
                    } else {
                        ElMessage.error('添加失败,请稍后再试');
                    }
                })
            } else {
                ElMessage.warning("您还没有登录，即将跳转到登录页")
                setTimeout(() => {
                    this.$router.push("/longin")
                }, 2000)
            }
        }
    },
};
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

.tuijian {
    width: 1300px;
    margin: 50px auto;

    .list {
        display: flex;
        list-style: none;
        border-top: 1px solid #f6f1f1;

        li {
            width: 240px;
            border: 1px solid red;
            margin: 10px;
        }

        img {
            width: 240px;
            height: 200px;
        }
    }
}

.goods {
    width: 90%;
    margin-top: 95px;
    margin-left: 101px;

    h2 {
        height: 40px;
    }

    p {
        margin-top: 10px;
    }

}

.niu {
    margin-top: 10px;
    padding: 10px;
}

.box {
    width: 1200px;
    margin: 50px auto;

}

.left {
    display: flex;
    justify-content: space-between;
}

.rightshop {
    width: 500px;
    border: 1px solid pink;
}

.active {
    border: 1px solid red !important;
}

.middle img {
    width: 400px;
    display: block;
}

.small {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    width: 400px;

}

.small img {
    width: 75px;
    border: 1px solid rgb(255, 255, 255);
}

.xing {
    display: flex;
    align-items: center;
}

.mark {
    width: 200px;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: crosshair;
    position: absolute;
    left: 0;
    top: 0;
}

.middle {
    position: relative;
}

.wrap {
    position: relative;
    // margin: 500px auto;
    width: 400px;
    margin-top: 20px;
}

.big {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 400px;
    top: 0;
    overflow: hidden;
}

.demo-rate-block {
    width: 25%;
    box-sizing: border-box;
}

.demo-rate-block:last-child {
    border-right: none;
}

.demo-rate-block .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}
</style>