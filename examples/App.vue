<template>
  <div id="app">
    <button @click="show1">组件形式打开</button>
    <button @click="show2">调用方法打开</button>
    <button @click="show3">弹窗组件</button>
    <windows 
      :visible.sync='visible' 
      @close='close'
      :title="title"
    >
      <div>111111</div>
      <div slot="footer">111111</div>
    </windows>
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
import windows from '../packages/vue-dark-photo/windows'
export default {
  components: { windows },
  data() {
    return {
      imgData: 'https://dark2017.github.io/vue-dark-photo.github.io/img/demo1.03e26b03.gif',
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
