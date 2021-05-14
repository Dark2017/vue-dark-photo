<template>
  <div id="app">
    <button @click="show1">组件形式打开</button>
    <button @click="show2">调用方法打开</button>
    <VDPhoto 
      ref="VDPhoto"
      :imgData='imgData'
      :imgName='imgName'
      @publish='publish'
      @close='close'
    >
    </VDPhoto>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgData: require('../public/logo.png'),
      imgName: '图片名',
      width: '10px'
    }
  },
  methods: {
    show1() {
      this.$refs.VDPhoto.show()
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
    },
    // 可以使用el-dialog的事件等...
    close() {
      console.log('close');
    }
  }
}
</script>

<style>

</style>
