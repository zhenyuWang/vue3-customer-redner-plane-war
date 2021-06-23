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
    <!-- <EnemyBullet :x="100" :y="100" /> -->
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
import { game } from "../game";
import { ref, onMounted, onUnmounted } from "vue";
import { hitObjectTest } from "../utils";
import config from "../config";
export default {
  components: { Map, Plane, PlaneBullet, Enemy, EnemyBullet },
  setup(props, { emit }) {
    const score = ref(0);
    const addScore = val => {
      score.value += val;
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

    // 敌机与飞机碰撞检测
    const enemyPlaneCollision = () => {
      enemys.forEach((enemy, eIndex) => {
        if (hitObjectTest(enemy, planeInfo)) {
          hurtEnemy(eIndex, config.plane.hurt);
          hurtPlane(config.enemy.hurt);
        }
      });
    };

    // 敌机与飞机子弹碰撞检测
    const enemyPlaneBulletCollision = () => {
      enemys.forEach((enemy, eIndex) => {
        planeBullets.forEach((bullet, bIndex) => {
          if (hitObjectTest(enemy, bullet)) {
            hurtEnemy(eIndex, config.plane.hurt);
            removePlaneBullet(bIndex);
          }
        });
      });
    };

    // 敌机子弹与飞机碰撞检测
    const enemyBulletPlaneCollision = () => {
      enemyBullets.forEach((bullet, index) => {
        if (hitObjectTest(bullet, planeInfo)) {
          removeEnemyBullet(index);
          hurtPlane(config.enemy.hurt);
        }
      });
    };
    // 敌机子弹与飞机子弹碰撞检测
    const enemyBulletPlaneBulletCollision = () => {
      enemyBullets.forEach((enemyBullet, eIndex) => {
        planeBullets.forEach((planeBullet, bIndex) => {
          if (hitObjectTest(enemyBullet, planeBullet)) {
            removeEnemyBullet(eIndex);
            removePlaneBullet(bIndex);
          }
        });
      });
    };

    const changePage = pageName => {
      emit("changePage", pageName);
    };
    onMounted(() => {
      game.ticker.add(enemyPlaneCollision);
      game.ticker.add(enemyPlaneBulletCollision);
      game.ticker.add(enemyBulletPlaneCollision);
      game.ticker.add(enemyBulletPlaneBulletCollision);
    });
    onUnmounted(() => {
      game.ticker.remove(enemyPlaneCollision);
      game.ticker.remove(enemyPlaneBulletCollision);
      game.ticker.remove(enemyBulletPlaneCollision);
      game.ticker.remove(enemyBulletPlaneBulletCollision);
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
