<template>
  <div
    v-show="isExtreme && isHint"
    id="message"
    :class="['msg', icon!=''? `iconfont ${icon} icon`:icon]"
    :style="{'color':color, 'backgroundColor':bgColor}"
  >
    {{title}}
  </div>
</template>

<script>
export default {
  name: "message",
  props: {
    // 是否展示提示
    isHint: {
      type: Boolean,
      default: true,
    },
    // 字体颜色
    color: {
      type: String,
      default: "#ffffff",
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "#000000",
    },
    // 图标
    icon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      time: null,
      isExtreme: false,
      title: "",
    };
  },
  methods: {
    // 照片到尽头提示
    messageShow(title) {
      if (!this.time) {
        this.title = title;
        this.isExtreme = true;
        this.time = setTimeout(() => {
          this.time = null;
          this.isExtreme = false;
        }, 1500);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.msg {
  position: relative;
  overflow: hidden;
  top: 200px;
  margin: 0 auto;
  max-width: 200px;
  border-radius: 10px;
  padding: 10px 20px;
  text-align: center;
  opacity: 0;
  z-index: 2021;
  animation: opacity 1.2s reverse linear;
}
@keyframes opacity {
  0% {
    transform: translateY(-40px);
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    opacity: 0.5;
  }
  100% {
    transform: translateY(40px);
    opacity: 0;
  }
}
</style>