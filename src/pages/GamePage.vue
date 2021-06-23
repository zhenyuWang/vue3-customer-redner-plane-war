<template>
  <container>
    <Map />
    <Plane
      @changePage="changePage"
      :x="planeInfo.x"
      :y="planeInfo.y"
      :bloodVolume="planeInfo.bloodVolume"
    />
    <PlaneBullet v-for="(bullet,index) in planeBullets" :key="index" :x="bullet.x" :y="bullet.y" />
    <Enemy
      v-for="(enemy,index) in enemys"
      :key="index"
      :x="enemy.x"
      :y="enemy.y"
      @addScore="addScore"
      :bloodVolume="enemy.bloodVolume"
    ></Enemy>
    <EnemyBullet v-for="(bullet,index) in enemyBullets" :key="index" :x="bullet.x" :y="bullet.y" />
    <text :text="`得分：${score}`" :x="10" :y="10"></text>
    <text :text="`生命：${planeInfo.bloodVolume}`" :x="600" :y="10"></text>
  </container>
</template>
<script>
import Map from "../components/Map.vue";
import Plane, { usePlane } from "../components/Plane.vue";
import PlaneBullet, { usePlaneBullet } from "../components/PlaneBullet.vue";
import EnemyBullet, { useEnemyBullet } from "../components/EnemyBullet.vue";
import Enemy, { useEnemy } from "../components/Enemy.vue";
import { ref } from "vue";
import { fighting } from "../game/fighting.js";
export default {
  components: { Map, Plane, PlaneBullet, Enemy, EnemyBullet },
  setup(props, { emit }) {
    const score = ref(0);
    const addScore = val => {
      score.value += val;
    };
    const changePage = pageName => {
      emit("changePage", pageName);
    };
    const {
      bullets: planeBullets,
      addBullet: addPlaneBullet,
      removeBullet: removePlaneBullet
    } = usePlaneBullet();
    const { planeInfo, hurtPlane } = usePlane(addPlaneBullet);
    const {
      bullets: enemyBullets,
      addBullet: addEnemyBullet,
      removeBullet: removeEnemyBullet
    } = useEnemyBullet();
    const { enemys, hurtEnemy } = useEnemy(addEnemyBullet);

    fighting({
      enemys,
      planeInfo,
      hurtPlane,
      planeBullets,
      removePlaneBullet,
      enemyBullets,
      removeEnemyBullet,
      hurtEnemy
    });

    return {
      score,
      addScore,
      planeBullets,
      planeInfo,
      enemys,
      enemyBullets,
      changePage
    };
  }
};
</script>
