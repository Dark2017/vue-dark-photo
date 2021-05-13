<template>
  <div id="app">
    <button @click="show1">组件形式打开</button>
    <button @click="show2">调用方法打开</button>
    <viewPhoto 
      ref="viewPhoto"
      :imgData='imgData'
      :imgName='imgName'
      @publish='publish'
    ></viewPhoto>
  </div>
</template>

<script>
import viewPhoto from '../packages/viewPhoto/components'
export default {
  components: {
    viewPhoto
  },
  data() {
    return {
      imgData: require('../public/logo.png'),
      imgName: '图片名'
    }
  },
  methods: {
    show1() {
      this.$refs.viewPhoto.show()
    },
    show2() {
      this.$VDPhoto.show({
        imgData: require('../public/logo.png'),
        imgName: '图片名'
      });
    },
    // 打印回调
    publish(val) {
      // do somethings ...
      console.log(val,'--val--');
    }
  }
}
</script>

<style>

</style>
