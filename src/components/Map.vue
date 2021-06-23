<template>
  <container>
    <sprite :x="preMapInfo.x" :y="preMapInfo.y" :texture="mapImg"></sprite>
    <sprite :x="nextMapInfo.x" :y="nextMapInfo.y" :texture="mapImg"></sprite>
  </container>
</template>
<script>
import mapImg from "../assets/images/map.jpg";
import { reactive, onMounted, onUnmounted } from "vue";
import { game } from "../game";
import config from "../config";
export default {
  setup() {
    const preMapInfo = reactive({
      x: 0,
      y: -1080
    });
    const nextMapInfo = reactive({
      x: 0,
      y: 0
    });
    // 地图移动
    const mapMove = () => {
      preMapInfo.y += config.map.speed;
      nextMapInfo.y += config.map.speed;
      if (nextMapInfo.y >= 1080) {
        preMapInfo.y = -1080;
        nextMapInfo.y = 0;
      }
    };
    onMounted(() => {
      game.ticker.add(mapMove);
    });
    onUnmounted(() => {
      game.ticker.remove(mapMove);
    });
    return {
      mapImg,
      preMapInfo,
      nextMapInfo
    };
  }
};
</script>
