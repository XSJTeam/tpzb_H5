<template>
  <div id="app">
    <transition :name="animateName">
      <!-- <keep-alive> -->
      <router-view class="view" />
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        animateName: 'slide-left',
      }
    },
    watch: {
      '$route'(to, from) {
        const prevPath = from.path
        const nextPath = to.path
        const prevIndex = this.pathList.findIndex(val => prevPath === val) // 前一个路由的索引
        const nextIndex = this.pathList.findIndex(val => nextPath === val) // 当前点击路由的索引
        if (prevIndex > nextIndex) {
          this.animateName = 'slide-left'
        } else {
          this.animateName = 'slide-right'
        }
      }
    },
    created() {},
    methods: {},
    // 监听路由的路径，可以通过不同的路径选择不同的切换效果
    beforeRouteUpdate(to, from, next) {
      const prevPath = from.path
      const nextPath = to.path
      const prevIndex = this.pathList.findIndex(val => prevPath === val) // 前一个路由的索引
      const nextIndex = this.pathList.findIndex(val => nextPath === val) // 当前点击路由的索引
      if (prevIndex > nextIndex) {
        this.animateName = 'slide-left'
      } else {
        this.animateName = 'slide-right'
      }
      next()
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
