<template>
  <transition name="dialog-fade">
    <div v-show="visible">
      <div id="bg" ref="bg" class="bg" @click="close"></div>
      <div @click="pop" ref="windows" :style="style" class="windows">
        <div class="windows_header">
          <slot name="title" class="title">
            <span>{{ title }}</span>
          </slot>
          <button type="button" @click="close" class="header_button">
            <span class="icon-close el-icon-close"></span>
          </button>
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
  components:{},
  data() {
    return {
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '50%'
    },
    title: {
      type: String,
      default: ''
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  mounted() {

  },
  methods: {
    pop() {

    },
    close() {
      this.$emit('update:visible', false)
      this.$emit('close')
    }
  },
  computed: {
    style() {
      let style = {}
      if(this.width) {
        style.width = this.width
      }
      return style
    }
  },
  watch: {
    visible(val) {
      if(val) {
        if(this.appendToBody) {
          this.$nextTick(() => {
            document.body.appendChild(this.$refs.bg)
          })
        }
      } else {
        setTimeout(() => {
          document.body.removeChild(this.$refs.bg)
        }, 150)
      }
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
}
.windows{
  z-index: 2001;
  position: fixed;
  background: #fff;
  margin: 50px auto 50px;
  left:0;
  right:0;
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
  }
}

</style>