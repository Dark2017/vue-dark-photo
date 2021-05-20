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
      imgData: require('../public/demo1.gif'),
      // imgData: 'https://dark2017.github.io/vue-dark-photo.github.io/img/logo.82b9c7a5.png',
      imgName: '图片名',
      width: '10px',
      visible: false,
      title: "test"
    }
  },
  methods: {
    show1() {
      this.$refs.VDPhoto.show()
    },
    show2() {
      this.$VDPhoto.show({
        imgData: require('../public/logo.png'),
        imgName: '图片名',
        title: ''
      });
    },
    show3() {
      this.visible = true
    },
    close(val) {
      console.log(val,'-val-');
      this.visible = false
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
