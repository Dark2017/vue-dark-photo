<!--
 * @Author: DarkLai
 * @Date: 2021-06-03 17:04:57
 * @Description : 波纹特效
-->
<template>
  <div class="Waves">
    <div class="main-container">
      <div class="waves">
        <div
          class="wave"
          v-for="(item, key) in waves"
          :key="key"
          :style="{ ...item }"
        >
          <div
            v-for="n in wavesConfig.total"
            :key="n"
            class="wave-item"
            :style="{
              transform: `scale(${0.1 * Math.sqrt(n - 1)})`, // 使得波纹大小指数增长
              opacity: 0.3 * (1 / n), // 因为相互层叠的波纹透明度会相互叠加，需要越小的波纹透明度越低，以免中心颜色过重
              animationDelay: `${(n - 1) * 0.12}s`, // 越大的波纹越晚出现，以呈现波纹逐渐扩散的效果
              animationDuration: `${0.6 + n * 0.3}s`, // 波纹动画时间渐增，表现波纹向外扩散渐慢的效果
              backgroundColor: wavesConfig.waveColor
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
* 波纹组件
* 根组件引入即可
*/
export default {
  name: "Waves",
  data() {
    return {
      waves: [],
      wavesConfig: {
        maxSize: 200, // px，波纹最大尺寸
        minSize: 100, // px，波纹最小尺寸
        zIndexCount: 999, // 波纹父元素其实z-index数值
        waveColor: "#40b6f0", //波纹基础颜色
        total: 5 //波纹圈层数
      },
      clickedCount: 0 //统计点击次数
    };
  },
  mounted() {
    document.getElementById("app").onclick = e => {
      this.clickedCount++; // 统计点击次数
      this.createWave(e);
    };
    let lastCount = 0;
    // 2秒内无点击清空waves，防止过多的dom累积占用内存
    setInterval(() => {
      if (lastCount === this.clickedCount) {
        this.waves = [];
      }
      lastCount = this.clickedCount;
    }, 2000);
  },
  methods: {
    createWave(e) {
      // 让新生成的波纹始终在之前波纹的上层产生叠加效果
      if (this.wavesConfig.zIndexCount > 99999) {
        this.wavesConfig.zIndexCount = 999;
      } else {
        this.wavesConfig.zIndexCount++;
      }
      // 在一定范围内随机生成波纹的大小
      const waveSize = parseInt(
        Math.random() * (this.wavesConfig.maxSize - this.wavesConfig.minSize) +
          this.wavesConfig.minSize
      );
      //添加新的波纹数据
      this.waves.push({
        left: `${e.clientX - waveSize / 2}px`,
        top: `${e.clientY - waveSize / 2}px`,
        zIndex: this.wavesConfig.zIndexCount,
        width: `${waveSize}px`,
        height: `${waveSize}px`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.waves {
  .wave {
    position: fixed;
    pointer-events: none; // 点击事件穿透，使得鼠标点击可以穿透波纹，兼容ie11及以上
    @keyframes wave {
      to {
        //波纹逐渐扩散变大变透明
        transform: scale(1);
        opacity: 0;
      }
    }
    .wave-item {
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 100%;
      animation: wave forwards ease-out;
    }
  }
}
</style>