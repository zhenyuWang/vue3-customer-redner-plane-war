import { onMounted, onUnmounted } from "vue";
import { game } from "../game";
import { hitObjectTest } from "../utils";
import config from "../config";
export function fighting({ enemys, enemyBullets, removeEnemyBullet, hurtEnemy, planeInfo, planeBullets, removePlaneBullet, hurtPlane }) {
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
}