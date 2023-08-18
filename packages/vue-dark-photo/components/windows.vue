<template>
  <transition name="fade">
    <div v-show="visible" @mousewheel="handleMousewheel">
      <div id="bg" ref="bg" class="bg" @click="close"></div>
      <div ref="windows" class="windows" :style="`width: ${imageWidthPercent}%`">
        <div class="windows_header">
          <slot name="title" class="title">
            <span>{{ title }}</span>
          </slot>
        </div>
        <div class="windows_body">
          <slot></slot>
        </div>
        <div class="windows_footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'windows',
  data() {
    return {}
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    imageWidthPercent: {
      type: Number,
      default: 50
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    handleMousewheel(event) {
      event.preventDefault()
    }
  }
}
</script>
<style lang='less' scoped>
.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2000;
  overflow: auto;
}
.windows{
  z-index: 2001;
  width: 50%;
  position: fixed;
  margin: 50px auto 50px;
  left: 0;
  right: 0;
  top: 0;
  .windows_header{
    padding: 20px 20px 10px;
    text-align: center;
    .header_button {
      border: none;
      background: #fff;
      float: right;
      position: relative;
      top: 2px;
    }
    .icon-close{
      cursor: pointer;
    }
  }
  .windows_body{
    padding: 30px 20px;
  }
  .windows_footer{
    padding: 10px 20px 20px;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9999;
  }
}

</style>
