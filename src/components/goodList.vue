<template>

    <ul class="list infinite-list">
        <router-link :to='"/detail?id=" + item.Id' v-for="item in list1" :key="item.Id">
            {{ list1.type }}
            <li>
                <img v-lazy="item.imageUrl" alt="" :key="item.imageUrl">
                <h4>{{ item.title }}</h4>
                <p>
                    <span class="price">{{ '￥' + item.priceStr }}</span>
                    <span class="mack">
                        <span class="bao" v-html="item.mack"></span>
                        <!-- <span class="yi">一起拼</span> -->
                    </span>
                </p>
            </li>
        </router-link>
    </ul>

</template>

<script>

// import { getGoodList } from "../tools/ajax.js"
export default {
    // name: 'WorkspaceJsonGoodList',
    name: "goodList",
    props: ["list1"],
    // created() {
    //     getGoodList({
    //         page: this.page
    //     }).then(data => {
    //         this.list.push(...data)

    //     })
    // },
    // watch: {
    //     page() {
    //         getGoodList({
    //             page: this.page
    //         }).then(data => {
    //             this.list.push(...data)
    //         })
    //     }
    // },

    mounted() {
        // console.log(this.$props)
    },

    methods: {
        // load() {
        //     console.log("load")
        //     this.page++

        // },
    },
};
</script>

<style lang="scss" scoped>
.list {
    width: 1200px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;

    li {
        width: 220px;
        text-decoration: none;
        color: #000;
        text-align: left;
        border: 1px solid #d3d3d3;
        margin: 30px 0 0 17px;
        list-style: none !important;

        img {
            width: 160px;
            height: 160px;
            margin: 20px 30px;
        }

        p {
            // line-height: 60px;

            span {
                vertical-align: middle;
            }

            .price {
                color: #ff4500;
                font-weight: bolder;
                font-size: 18px;
            }

            .mack {
                float: right;
                // padding: 5px;

                .bao {
                    color: #FFFFFF;
                    background: #AB7FD1;
                    border-color: #AB7FD1;
                    padding: 5px;
                }

                .yi {
                    color: #FB4C81;
                    padding: 5px;
                    border-color: #FB4C81;
                }
            }
        }

    }

}
</style>