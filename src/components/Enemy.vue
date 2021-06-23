<template>
  <container>
    <sprite :texture="enemyImg"></sprite>
    <rect :x="20" :y="0"></rect>
    <rectInner :x="20" :y="0" :width="props.bloodVolume/2"></rectInner>
  </container>
</template>
<script>
import enemyImg from "../assets/images/enemy.png";
import { reactive, ref, onUnmounted, onMounted } from "vue";
import { game } from "../game";
import config from "../config";
let _emit;
export default {
  props: ["bloodVolume"],
  setup(props, { emit }) {
    _emit = emit;
    return {
      enemyImg,
      props
    };
  }
};
export function useEnemy(onAttack) {
  // 敌机数据
  const enemys = reactive([]);
  // 敌机创建
  const createEnemy = () => {
    let x = Math.floor(
      Math.random() * config.container.width - config.enemy.width
    );
    x = x < 0 ? 0 : x;
    const width = config.enemy.width;
    const height = config.enemy.height;
    const bloodVolume = config.enemy.bloodVolume;
    return {
      x,
      y: 0,
      bloodVolume,
      width,
      height
    };
  };
  // 敌机新增
  const addEnemy = () => {
    enemys.push(createEnemy());
  };
  const move = () => {
    enemys.forEach((enemy, index) => {
      enemy.y += config.enemy.speed;
      if (move.y >= config.container.height) {
        removeEnemy(index);
      }
    });
  };
  // 敌机受到攻击
  const hurtEnemy = (index, hurtVal) => {
    if (!enemys[index]) return;
    if (enemys[index].bloodVolume > 0) {
      enemys[index].bloodVolume -= hurtVal;
      _emit("addScore", Math.floor(hurtVal / 50));
    }
    if (enemys[index].bloodVolume <= 0) {
      removeEnemy(index);
    }
  };
  // 敌机删除
  const removeEnemy = index => {
    enemys.splice(index, 1);
  };
  // 飞机攻击 -> 发射子弹
  const attack = enemy => {
    onAttack &&
      onAttack({
        x: enemy.x + 60,
        y: enemy.y + 90
      });
  };
  const addEnemyTimer = ref();
  const enemyAttackTimer = ref();
  onMounted(() => {
    game.ticker.add(move);
    addEnemyTimer.value = setInterval(() => {
      addEnemy();
    }, 2000);
    enemyAttackTimer.value = setInterval(() => {
      enemys.forEach(enemy => {
        attack(enemy);
      });
    }, 4000);
  });
  onUnmounted(() => {
    game.ticker.remove(move);
    clearInterval(addEnemyTimer.value);
    clearInterval(enemyAttackTimer.value);
  });
  return {
    enemys,
    hurtEnemy
  };
}
</script>
