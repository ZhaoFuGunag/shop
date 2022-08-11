<template>
    <div class="big">
        <!-- <h3>购物车页</h3> -->
        <el-checkbox-group v-if="list.length" v-model="arr">
            <ul>

                <li v-for="item in list" :key="item.Id" v-if="list.length">
                    <el-checkbox :label="item.Id" @change="checkChange"></el-checkbox>

                    <img :src="item.imageUrl" alt="" style="width: 100px;">
                    <h1>{{ item.title }}</h1>
                    <div class="car">
                        <div>

                            <h3 style="color: red; margin-left: 20px;">{{ '￥' + item.priceStr }}</h3>

                            <div style="display: flex; align-items: center;">
                                <el-icon style="font-size: 40px; width: 50px;" @click="add(item)">
                                    <CirclePlus />
                                </el-icon>
                                <span style="font-size: 20px;"> {{ item.count }}</span>
                                <el-icon style="font-size: 40px; width: 60px;" @click="remove(item)">
                                    <Remove />
                                </el-icon>
                            </div>
                        </div>
                        <div style="margin-left: 100px;">
                            <el-icon style="font-size: 40px;" @click="del(item)">
                                <Delete />
                            </el-icon>
                        </div>
                    </div>
                </li>
            </ul>
        </el-checkbox-group>
        <h2 v-else class="hao">
            <el-icon>
                <GoodsFilled />
            </el-icon>
            购物车空空如也
            <button>
                <router-link to="/">随便逛逛</router-link>
            </button>
        </h2>
        <div class="all">
            <div>
                <el-checkbox v-model="checkedAll" :indeterminate="isIndeterminate" border>全选{{ checkedAll }}
                </el-checkbox>
            </div>
            <h3>总价：{{ allPrice }}</h3>
            <div>
                <el-button type="danger" plain><i class="el-icon-s-goods"></i>结算</el-button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Delete, GoodsFilled } from "@element-plus/icons-vue"
</script>
<script>
// import {
//     ElButton,
//     ElCheckbox,
//     ElCheckboxGroup,
//     ElMessage,
//     ElMessageBox,
//     ElIcon
// } from "element-plus"
import { getList, getCartdel, getCartAdd, getRemove } from "../tools/ajax.js"
import { mapState } from 'vuex';
import { ElMessage } from 'element-plus'
import { markRaw } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
export default {
    name: 'WorkspaceJsonShopList',
    components: {
        getList,
    },
    data() {
        return {
            list: [],
            // 商品是否全部选中
            checkedAll: false,
            flag: true,
            // 
            arr: [],
            // 标记全选框是否是不确定状态
            isIndeterminate: false,
        };
    },
    created() {
        // this.add()
        // getCartAdd({
        //     token: this.token,
        //     goodId: 142
        // }).then(res => {
        //     console.log(res);
        // })
        console.log(this)

        this.data()
    },
    computed: {
        ...mapState(["token"]),
        // 记录所有商品的商品id数组
        idList() {
            // 商品列表的个数对应多选框的个数
            return this.list.map(function (item, index) {
                return item.Id;
            })
        },
        allPrice() {
            var total = 0;
            for (let i = 0; i < this.arr.length; i++) {
                const thisId = this.arr[i]
                for (let j = 0; j < this.list.length; j++) {
                    const goods = this.list[j]
                    if (goods.Id == thisId) {
                        total += goods.priceStr * goods.count
                        break
                    }
                }
            }
            return total;
        }
    },
    mounted() {

    },
    watch: {
        // 监听全选值,如果为true, 则把所有商品id加入checkList, 否则清空checkList
        checkedAll(newValue) {
            // 取消半选中
            this.isIndeterminate = false;
            if (newValue) {
                this.list.forEach((item) => {
                    // 判断这个商品id是否已经加入选中列表, 如果没有就添加进去
                    if (this.list.indexOf(item.Id) == -1) {
                        this.list.push(item.Id)
                    }
                })
            } else {
                // 清空选中列表
                this.list = []
            }
        }
    },

    methods: {
        // 删除此条商品
        del(item) {
            getCartdel({
                token: this.token,
                goodId: item.Id
            }).then(res => {
                console.log(res);
                if (res.code == 1) {
                    let result = confirm('确定要删除嘛？')
                    if (result) {
                        ElMessage({
                            message: '删除成功',
                            type: 'success',
                        })
                        this.data()

                    }
                } else {
                    ElMessage({
                        message: '添加失败',
                        type: 'warning',
                    })
                }
            })

        },
        // 减少此商品数量
        remove(item) {
            getRemove({
                token: this.token,
                goodId: item.Id
            }).then(res => {
                if (res.code == 1) {
                    if (item.count <= 1) {
                        // alert("不能再减啦")
                        ElMessageBox.confirm(
                            '不能再减啦',
                            {
                                type: 'warning',
                                icon: markRaw(Delete),
                            }
                        )
                        return
                    } else {
                        this.data()

                    }
                }
            })
        },
        // 添加此商品
        // add() {
        //     this.data()
        // },

        data() {

            getList({
                token: this.token
            }).then(res => {
                console.log(res);
                this.list = res
            })

        },
        add(item) {
            getCartAdd({
                token: this.token,
                goodId: item.Id
            }).then(res => {
                console.log(res);
                this.data()
            })
        },

        // 当多选框修改时,判断全选状态
        checkChange() {
            console.log("判断")
            // 1, 全部商品已选中
            if (this.arr.length == this.list.length) {
                this.checkedAll = true;
                this.isIndeterminate = false;
            }
            // 2, 全部商品都未选中
            else if (this.list.length == 0) {
                this.checkedAll = false;
                this.isIndeterminate = false;
            }
            // 3, 有一部分商品已选中
            else {
                this.isIndeterminate = true;
            }

        }
    },
};
</script>

<style lang="scss" scoped>
.hao {
    margin-left: 200px;
}

.big {
    width: 100%;

    ul {
        width: 1200px;
        margin: 0 auto;
        border: 1px solid red;
        border-radius: 10px;

        li {
            width: 90%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin: 10px 0;
            background: pink;
            border-radius: 15px;


            .car {
                display: flex;
                align-items: center;
            }
        }
    }

    .all {
        display: flex;
        position: fixed;
        border: 1px solid red;
        width: 100%;
        height: 60px;
        bottom: 0;
        justify-content: space-around;
        align-items: center;
    }
}
</style>