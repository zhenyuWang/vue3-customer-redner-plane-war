<template>
  <container>
    <sprite :texture="bulletImg"></sprite>
  </container>
</template>
<script>
import bulletImg from "../assets/images/bullet.png";
import { reactive, onMounted, onUnmounted } from "vue";
import { game } from "../game";
import config from "../config";
export default {
  setup() {
    return {
      bulletImg
    };
  }
};
export function usePlaneBullet() {
  const bullets = reactive([]);
  // 添加子弹
  const addBullet = bulletInfo => {
    bullets.push({
      ...bulletInfo,
      width: config.plane.bullet.width,
      height: config.plane.bullet.height
    });
  };
  // 删除子弹
  const removeBullet = index => {
    bullets.splice(index, 1);
  };
  // 子弹移动
  const move = () => {
    bullets.forEach((bullet, index) => {
      bullet.y -= config.plane.bullet.speed;
      if (bullet.y <= -config.plane.bullet.height) {
        removeBullet(index);
      }
    });
  };
  onMounted(() => {
    game.ticker.add(move);
  });
  onUnmounted(() => {
    game.ticker.remove(move);
  });
  return { bullets, addBullet, removeBullet };
}
</script>
 