<template>
  <div id="app">
    <button @click="show1">组件形式打开</button>
    <button @click="show2">调用方法打开</button>
    <VDPhoto
      ref="VDPhoto"
      :imgArr="imgArr"
      @publish="publish"
      @close="close"
    >
    </VDPhoto>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgData: require("../public/demo1.gif"),
      // imgData: 'https://dark2017.github.io/vue-dark-photo.github.io/img/logo.82b9c7a5.png',
      width: "10px",
      title: "test",
      imgArr: [
        "https://dark2017.github.io/vue-dark-photo.github.io/img/logo.82b9c7a5.png",
        require("../public/demo1.gif"),
        require("../public/logo.png"),
      ],
    };
  },
  methods: {
    show1() {
      this.$refs.VDPhoto.show();
    },
    show2() {
      this.$VDPhoto.show({
        imgData: require("../public/logo.png"),
        // imgArr: this.imgArr,
        title: "图片",
      });
    },
    close(val) {
      console.log(val, "-val-");
    },
    // 打印回调
    publish(val) {
      // do somethings ...
      console.log(val, "--val--");
    },
    close() {
      console.log("close");
    },
  },
};
</script>

<style>
</style>
