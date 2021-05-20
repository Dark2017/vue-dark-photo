<!--
 * @Author: DarkLai
 * @Date: 2020-11-13 17:45:57
 * @Description : VDPhoto 组件
-->
<template>
  <windows
    :visible="showBox"
    @close="destroy"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div slot="title" class="title">{{ title }}</div>
    <section class="header-photo" slot="footer">
      <div class="head-content">
        <div class="tools-wrap">
          <div class="photo-tools">
            <abbr title="缩小">
              <span @click="narrow" class="iconfont icon-zoom-in icon"></span>
            </abbr>
            <abbr title="实际大小">
              <span @click="reduction" class="iconfont icon-fullscreen-expand icon-browse icon"></span>
            </abbr>
            <abbr title="放大">
              <span @click="enlarge" class="iconfont icon-zoom-out icon"></span>
            </abbr>
            <abbr title="旋转">
              <span @click="rotate" class="iconfont icon-refresh icon"></span>
            </abbr>
            <abbr title="下载">
              <span
                @click="downloadFile(imgData)"
                class="iconfont icon-download icon"
              ></span>
            </abbr>            
            <abbr title="打印">
              <span class="iconfont icon-print icon" @click="publish"></span>
            </abbr>            
            <abbr title="压缩">
              <span class="iconfont icon-print icon" @click="compress"></span>
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
        @mousewheel='mouseWheel'
        :src="imgData"
        :style="{
          transform: `translateX(${activeImg.x + 'px'}) translateY(${
            activeImg.y + 'px'
          }) scale(${activeImg.scale}) rotate(${activeImg.rotate}deg)`,
        }"
      />
      <slot></slot>
      <!--endprint-->
    </section>
  </windows>
</template>

<script>
import { downloadFileByURL } from "./utils/download";
import { dealImage } from './utils/compress'
import windows from "./windows";
import print from "./utils/print";
import { suffix_photo_list } from "./utils/constart";
export default {
  name: "VDPhoto",
  components: {
    windows
  },
  props: {
    // 图片数据
    imgData: {
      type: String,
      default: "",
    },
    // 图片名
    imgName: {
      type: String,
      default: "",
    },
    // 标题
    title: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      showBox: false,
      // 当前图片变换参数
      activeImg: {
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }
    };
  },
  methods: {
    // 初始化
    show() {
      this.showBox = true;
    },
    destroy() {
      this.showBox = false;
      this.reduction()
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
      this.activeImg.scale = 1;
      this.activeImg.x = 0;
      this.activeImg.y = 0;
      this.activeImg.rotate = 0;
    },
    // 旋转
    rotate() {
      let rotate = this.activeImg.rotate;

      rotate += 90;

      this.activeImg.rotate = rotate;
    },
    // 滚轮缩放
    mouseWheel(e) {
      if(e.deltaY > 0) {
        this.enlarge()
      }
      if(e.deltaY < 0) {
        this.narrow()
      }
    },
    // 下载
    downloadFile(url) {
      let name;
      if (!this.imgName) {
        let tmp = url.lastIndexOf("/");
        let tmpO = url.lastIndexOf(".");
        let tmpName = url.substring(tmp + 1, tmpO);
        name = tmpName;
      } else {
        name = this.imgName;
      }
      // 下载图片
      downloadFileByURL(url, name);
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
    compress() {
      let obj = {
        width: '500px',
        height: '500px',
        quality: 0.7
      }
      dealImage(this.imgData, obj, (base) => {
        this.downloadFile(base, '11')
        console.log(base,'--base--');
      })
    }
  },
  computed: {
    suffixName() {
      return this.imgData
        .substring(this.idx + 1, this.imgData.length)
        .toLowerCase();
    },
    idx() {
      return this.imgData.lastIndexOf(".");
    },
    isImg() {
      return suffix_photo_list[this.suffixName];
    },
  },
};
</script>


<style lang="less" scoped>
@import './style/index.css';
abbr[title]{
  border-bottom: none !important;
  text-decoration: none !important;
}
.title {
  text-align: center;
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

      .icon{
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
