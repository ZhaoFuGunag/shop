<template>
  <div class="mark" v-show="flag">
    <img src="./assets/loading.4bbc20d4.jpg" alt="">
  </div>
  <nav>

    <Index></Index>

  </nav>
  <router-view></router-view>
  <!-- 回到顶部 -->
  <!-- <el-backtop :right="100" :bottom="100" /> -->

  <el-backtop :right="100" :bottom="100">
    <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
      <div class="back">
        回到顶部
      </div>
    </div>
  </el-backtop>

</template>

<script>
import Index from "./components/Index.vue"

export default {
  data() {
    return {
      flag: true
    }
  },
  components: {
    Index
  },
  watch: {
    $route() {
      this.flag = true
      setTimeout(() => {
        this.flag = false
      }, 1000)
    }
  },
  mounted() {
    setTimeout(() => {
      this.flag = false
    }, 1000)
  }
}

</script>
<style lang="scss">
body,
html {
  scroll-behavior: smooth;
}

.back {
  border-radius: 10px;
  width: 68px;
  height: 70px;
  background: rgb(110, 0, 244);
  color: white;
  line-height: 70px;
  font-size: 16px;
}

.mark {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 444;
  background-color: #eee;
}

.mark img {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;

}

nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;


    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
