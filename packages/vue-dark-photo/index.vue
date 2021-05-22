<!--
 * @Author: DarkLai
 * @Date: 2020-11-13 17:45:57
 * @Description : VDPhoto 组件
-->
<template>
  <div>
    <windows :visible="showBox" @close="destroy" v-bind="$attrs" v-on="$listeners">
      <section class="header-photo" slot="footer">
        <div class="head-content">
          <div class="tools-wrap">
            <div class="photo-tools">
              <abbr title="上一张" v-if="!imgData && imgArr.length >= 2">
                <span @click="left" class="iconfont icon-arrow-left-bold icon"></span>
              </abbr>
              <abbr title="缩小">
                <span @click="narrow" class="iconfont icon-zoom-in icon"></span>
              </abbr>
              <abbr title="实际大小">
                <span @click="reduction" class="iconfont icon-fullscreen-expand icon"></span>
              </abbr>
              <abbr title="放大">
                <span @click="enlarge" class="iconfont icon-zoom-out icon"></span>
              </abbr>
              <abbr title="逆时针旋转">
                <span
                  @click="rotate('right')"
                  style="transform: rotateY(180deg); display: inline-block;"
                  class="iconfont icon-refresh icon"
                ></span>
              </abbr>
              <abbr title="顺时针旋转">
                <span @click="rotate('left')" class="iconfont icon-refresh icon"></span>
              </abbr>
              <abbr title="下载">
                <span @click="downloadFile(currentImg)" class="iconfont icon-download icon"></span>
              </abbr>
              <abbr title="打印">
                <span class="iconfont icon-print icon" @click="publish"></span>
              </abbr>
              <abbr title="下一张" v-if="!imgData && imgArr.length >= 2">
                <span @click="right" class="iconfont icon-arrow-right-bold icon"></span>
              </abbr>
            </div>
          </div>
        </div>
      </section>

      <section class="content">
        <!--startprint-->
        <img
          class="img"
          alt
          v-if="isImg"
          ref="imgBox"
          @mousedown="down"
          @mousewheel="mouseWheel"
          :src="currentImg"
          :style="{
          transform: `translateX(${activeImg.x + 'px'}) translateY(${
            activeImg.y + 'px'
          }) scale(${activeImg.scale}) rotate(${activeImg.rotate}deg)`,
          transition: `${openAnime && transition} 0.3s linear`
        }"
        />
        <!--endprint-->
      </section>
    </windows>

    <message ref="message" :title="title" :extreme="extreme" :isHint="isHint" />
  </div>
</template>

<script>
import { downloadFileByURL } from "./utils/download";
import windows from "./windows";
import message from "./message";
import print from "./utils/print";
import { suffix_photo_list, message_text } from "./utils/constart";
export default {
  name: "VDPhoto",
  components: {
    windows,
    message,
  },
  props: {
    // 图片数据
    imgData: {
      type: String,
      default: "",
    },
    // 图片数组
    imgArr: {
      type: Array,
      default: () => [],
    },
    // 是否展示提示
    isHint: {
      type: Boolean,
      default: true,
    },
    // 是否需要过渡动画
    isAnimation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showBox: false,
      message_show: false,
      // 当前图片变换参数
      activeImg: {
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
      },
      index: 0,
      title: "",
      extreme: false,
      // 旋转动画持续时间
      time: "0.3s",
      openAnime: true,
    };
  },
  methods: {
    // 初始化
    show() {
      this.showBox = true;
    },
    destroy() {
      this.showBox = false;
      this.$emit("close");
      this.reduction();
    },
    // 上一张
    left() {
      if (this.index > 0) {
        this.index--;
        this.openAnime = false;

        this.reduction();
      } else {
        this.$refs.message.messageShow(message_text["first"]);
      }
    },
    // 下一张
    right() {
      if (this.imgArr.length - 1 > this.index) {
        this.index++;
        this.openAnime = false;

        this.reduction();
      } else {
        this.$refs.message.messageShow(message_text["last"]);
      }
    },
    // 鼠标按下
    down(e) {
      let downX = e.pageX;

      let downY = e.pageY;

      let prevDix = this.activeImg.x;

      let prevDiy = this.activeImg.y;

      window.onmousemove = (a) => {
        let moveX = a.pageX;
        let moveY = a.pageY;

        let diX = parseInt(moveX - downX);

        let diY = parseInt(moveY - downY);

        this.activeImg.x = diX + prevDix;

        this.activeImg.y = diY + prevDiy;

        return false;
      };

      window.onmouseup = () => {
        window.onmousemove = window.onmouseup = null;
      };

      return false;
    },
    // 放大
    enlarge() {
      let scale = this.activeImg.scale;

      scale += 0.1;

      if (scale >= 5) {
        scale = 5;
      }

      this.activeImg.scale = scale;
    },
    // 缩小
    narrow() {
      let scale = this.activeImg.scale;

      scale -= 0.1;

      if (scale <= 0.1) {
        scale = 0.1;
      }

      this.activeImg.scale = scale;
    },
    // 还原
    reduction() {
      this.openAnime = false;
      this.activeImg.scale = 1;
      this.activeImg.x = 0;
      this.activeImg.y = 0;
      this.activeImg.rotate = 0;
    },
    // 旋转
    rotate(direction) {
      let rotate = this.activeImg.rotate;

      rotate += direction === "left" ? 90 : -90;
      this.openAnime = true;
      this.activeImg.rotate = rotate;
    },
    // 滚轮缩放
    mouseWheel(e) {
      if (e.deltaY > 0) {
        this.enlarge();
      }
      if (e.deltaY < 0) {
        this.narrow();
      }
    },
    // 下载
    downloadFile(url) {
      if (url)
        downloadFileByURL(
          url,
          url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
        );
    },
    // 打印
    publish() {
      if (this.isImg) {
        print(this.$refs.imgBox);
      } else {
        console.log("请下载后打印");
      }
      this.$emit("publish", this.$refs.imgBox);
    },
  },
  computed: {
    currentImg() {
      return this.imgData ? this.imgData : this.imgArr[this.index];
    },
    currentLength() {
      return this.imgData
        ? this.imgData.length
        : this.imgArr[this.index].length;
    },
    suffixName() {
      return (
        this.currentImg &&
        this.currentImg
          .substring(this.idx + 1, this.currentLength)
          .toLowerCase()
      );
    },
    idx() {
      return this.currentImg.lastIndexOf(".");
    },
    isImg() {
      return suffix_photo_list[this.suffixName];
    },
    transition() {
      return this.isAnimation ? "all" : "none";
    },
  },
};
</script>


<style lang="less" scoped>
@import "./style/index.css";
abbr[title] {
  border-bottom: none !important;
  text-decoration: none !important;
}
.header-photo {
  width: 100%;
  .head-content {
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 工具条
  .tools-wrap {
    .photo-tools {
      display: flex;
      height: inherit;
      padding: 0 22px;

      .icon {
        color: #fff;
        opacity: 0.5;
        font-size: 26px;
      }

      & > abbr {
        font-size: 20px;
        cursor: pointer;
        -webkit-app-region: no-drag;

        &:not(:nth-of-type(1)) {
          margin-left: 24px;
        }
      }
    }
  }
}

.content {
  // overflow: hidden;
  text-align: center;
  .img {
    max-height: 100%;
    max-width: 100%;
    margin: auto;
  }
  .iframe {
    max-width: 100%;
    min-height: 500px;
  }
}
</style>
<style media="print">
@page {
  size: auto; /* auto is the initial value */
  margin: 0mm; /* this affects the margin in the printer settings */
}
</style>
