<template>
  <div id="app">
    <button @click="show1">组件形式打开</button>
    <button @click="show2">调用方法打开</button>
    <VDPhoto
      ref="VDPhoto"
      :imgArr="imgArr"
      @publish="publish"
      @close="close"
      :customAction='customAction'
      :ifWave='true'
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
        "https://i.picsum.photos/id/132/300/200.jpg?hmac=2N8jz1dK3-iM_g-_Bl-cJdFysVCuyHtyJ7H0TmAxGVk",
        require("../public/demo1.gif"),
        require("../public/logo.png"),
      ],
      customAction: {
        // narrow: false,
        // reduction: false,
        // enlarge: false,
        // leftRotate: false,
        // rightRotate: false,
        // downloadFile: false,
        // publish: false,
        // mouseWheel: false,
        // mouseDown: false,
        custom:[
          {
            title: '自定义操作',
            onClick: () => {
              console.log('自定义操作');
            },
            style: {
              'color' : 'white' 
            },
            content: '自定义操作'
          }
        ]
      }
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
        customAction: this.customAction,
        publish: (val) => {
          console.log(val,'-val--');
        }
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
