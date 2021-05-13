<template>
  <div id="app">
    <button @click="show">打开图片</button>
  </div>
</template>

<script>
export default {
  methods: {
    show() {
      this.$ffViewPhoto.show({
        // 图片数据
        imgData: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1694681277,1453280371&fm=26&gp=0.jpg",
        imgName: '图片名'
      });
    }
  }
}
</script>

<style>

</style>
