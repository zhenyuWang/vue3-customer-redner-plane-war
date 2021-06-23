<template>
  <container>
    <sprite :texture="bulletImg" :rotation="3.15"></sprite>
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
export function useEnemyBullet() {
  const bullets = reactive([]);
  // 添加子弹
  const addBullet = bulletInfo => {
    bullets.push({
      ...bulletInfo,
      width: config.enemy.bullet.width,
      height: config.enemy.bullet.height
    });
  };
  // 删除子弹
  const removeBullet = index => {
    bullets.splice(index, 1);
  };
  // 子弹移动
  const move = () => {
    bullets.forEach((bullet, index) => {
      bullet.y += config.enemy.bullet.speed;
      if (bullet.y >= config.container.height) {
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
 