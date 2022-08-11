<template>
  <div class="home">
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
    <!-- 轮播图 -->
    <div class="block">

      <el-carousel height="500px">
        <el-carousel-item v-for="item in imgs" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 主页商品列表组件 -->
    <goodList :list1="list"></goodList>




  </div>
  <router-view></router-view>


</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import axios from "axios"
// import { tsThisType } from "@babel/types"
import { getBanner, getGoodList, getTitle } from "../tools/ajax.js"
import goodList from "@/components/goodList.vue";
// import { ref } from 'vue'
// const count = ref(0)


export default {
  data() {
    return {
      arr: [],
      imgs: ["http://192.168.207.72:1024/images/a.jpg"],
      list: [],
      page: 0,
      loading: false,
    }
  },
  name: 'HomeView',
  created() {
    this.scrollHandle()
    this.bindScroll()
    getBanner().then(data => {

      this.imgs = data.data
    });

    // 一级标题
    getTitle().then(data => {

      this.arr = data.slice(0, 9)
    })
    // 初始化请求第一页商品
    this.getshop()
  },

  components: {
    goodList,


  },
  methods: {
    // 请求商品列表
    getshop() {
      this.page++
      getGoodList({
        page: this.page
      }).then(data => {
        // console.log(data);

        this.list.push(...data)


      })
    },
    bindScroll() {
      // 对window添加滚动监听
      window.addEventListener("scroll", this.scrollHandle);

    },
    scrollHandle() {
      // console.log("滚动",this)
      // 如果正在加载数据,返回,不再监听,  实现限流 
      if (this.loading) return;
      // 获取网页的总高度
      var B = document.body.scrollHeight ||
        document.documentElement.scrollHeight;
      // 获取窗口显示高度
      var H = window.innerHeight;
      // 获取网页滚动距离
      var S =
        document.body.scrollTop ||
        document.documentElement.scrollTop;
      // console.log(B, H, S);
      // 网页总高 - 窗口高 - 滚动距离 < 10 说明滚动到底了
      if (B - H - S < 10) {
        console.log("触底")
        // 加载新一页数据
        this.getshop();
      }
    }

  },
}
</script>
<style lang="scss" scoped>
a {
  width: 80px;
  text-decoration: none;
  color: rgba(123, 120, 120, 0.849);
}

.home {
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
      // border: 1px solid red;
      // margin: 0 2px;
      // width: 40px;
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

  .block {
    width: 1200px;
    height: 500px;
    margin: auto;
    border-radius: 20px;
    overflow: hidden;
  }

  // .list {
  //   width: 1200px;
  //   margin: auto;
  //   display: flex;
  //   flex-wrap: wrap;

  //   li {
  //     width: 220px;
  //     text-decoration: none;
  //     color: #000;
  //     text-align: left;
  //     border: 1px solid #d3d3d3;
  //     margin: 30px 0 0 17px;
  //     list-style: none !important;

  //     img {
  //       width: 160px;
  //       height: 160px;
  //       margin: 20px 30px;
  //     }

  //     p {
  //       // line-height: 60px;

  //       span {
  //         vertical-align: middle;
  //       }

  //       .price {
  //         color: #ff4500;
  //         font-weight: bolder;
  //         font-size: 18px;
  //       }

  //       .mack {
  //         float: right;
  //         // padding: 5px;

  //         .bao {
  //           color: #FFFFFF;
  //           background: #AB7FD1;
  //           border-color: #AB7FD1;
  //           padding: 5px;
  //         }

  //         .yi {
  //           color: #FB4C81;
  //           padding: 5px;
  //           border-color: #FB4C81;
  //         }
  //       }
  //     }

  //   }

  // }

  // .loading {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0, 0, 0, 0.3);
  //   text-align: center;
  //   line-height: 100vh;
  //   color: white;
  // }
}
</style>
