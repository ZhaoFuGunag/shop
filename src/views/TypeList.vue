<template>

    <div class="box">
        <!--  一级分类标题 -->
        <div class="type">
            <div v-for="(item, i) in arr" :key="i" class="title">
                <router-link :to="{
                    name: 'typeList',
                    query: {
                        name: item
                    }
                }">{{ item }}</router-link>
            </div>
        </div>
        <keep-alive>
            <div ref="ff">
                <div v-for="item in arr3" class="wrap" :key="item.type">
                    <h1 class="title">{{ item.type }}</h1>

                    <goodList :list1="item.list">

                    </goodList>



                </div>
            </div>

        </keep-alive>

        <ul class="cetitle">
            <li v-for="(item, index) in arr3" :class="index == num ? 'active' : ''
            " @click="add(index)">
                {{ item.type }}
            </li>
        </ul>

    </div>
</template>

<script>

import goodList from '@/components/goodList'
import { getTitle, getGoodList } from "../tools/ajax.js"
export default {
    // name: 'ShopHHH',
    components: {
        goodList
    },
    data() {
        return {
            arr: [],
            arr1: [],
            arr3: [],
            // 当前展示的二级分类索引
            num: 0

        };
    },
    created() {
        getTitle().then(data => {
            this.arr = data.slice(0, 9)
        })

    },
    beforeRouteEnter(to, from, next) {
        console.log("路由进入")

        next(vm => {
            vm.getType(to)
        })
    },
    beforeRouteUpdate(to, from, next) {
        this.getType(to)
        next()
    },
    methods: {
        getType(a) {
            getGoodList({
                "type_one": a.query.name
            }).then(data => {
                this.arr1 = data
                console.log(this.arr1);
                var arr2 = [];
                console.log(data);
                for (var i = 0; i < this.arr1.length; i++) {
                    var flag = false
                    for (var j = 0; j < arr2.length; j++) {
                        if (this.arr1[i].type_two == arr2[j].type) {
                            arr2[j].list.push(this.arr1[i])
                            flag = true
                            break
                        }
                    }
                    if (!flag) {
                        arr2.push({
                            type: this.arr1[i].type_two,
                            list: [this.arr1[i]]
                        })
                    }
                }
                console.log(arr2);
                this.arr3 = arr2
            })
        },
        add(index) {
            this.num = index
            document.body.scrollTop = document.documentElement.scrollTop = Array.from(this.$refs.ff.children)[index].offsetTop - 80


            // var tit = this.$refs.ff.getElementsByClassName("title")[index];
            // var targetTop = tit.offsetTop - 80;
            // document.scrollingElement.scrollTop = targetTop;
        },
        dong() {
            let st = document.body.scrollTop || document.documentElement.scrollTop
            let H = window.innerHeight
            Array.from(this.$refs.ff.children).forEach((item, index) => {
                let h = item.offsetHeight
                let offsetTop = item.offsetTop
                console.log(h, offsetTop);
                if (H / 2 + st > offsetTop && H / 2 + st < offsetTop + h) {

                    this.num = index
                }
            })

        }


    },
    mounted() {
        window.addEventListener("scroll", this.dong)
    },


};
</script>

<style lang="scss" scoped>
a {
    width: 80px;
    text-decoration: none;
    color: rgba(123, 120, 120, 0.849);
}


.box {
    .active {
        color: purple;
        font-weight: bolder;
        filter: drop-shadow(0 0 10px purple);
    }

    .wrap {

        h1 {
            width: 1200px;
            text-align: center;
            background: rgb(27, 141, 228);
            color: white;
            margin: 0 auto;
        }
    }

    .cetitle {
        position: fixed;
        top: 150px;
        left: 20px;
        border: 1px solid rgb(191, 0, 255);
        padding: 10px;
        border-radius: 5px;

        li:hover {
            color: purple;
            font-weight: bolder;
            filter: drop-shadow(0 0 10px purple);
        }

        li {
            line-height: 40px;
            list-style: none;
            text-align: center;
        }

    }

    .type {
        width: 1200px;
        margin: auto;
        background: #fff;
        padding: 10px;
        line-height: 30px;
        white-space: nowrap;
        display: flex;
        justify-content: space-between;

        .title:hover {

            background-color: rgb(136, 0, 255);
            color: white;
        }

        .title:hover a {
            color: white;
        }

        .title {
            width: 80px;
            text-align: center;

        }


        div {
            display: inline-block;
            padding: 0 40px;
            border-radius: 20px;
            transition: all .3s;
            color: #666;
            text-decoration: none;
        }
    }
}
</style>