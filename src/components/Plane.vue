<template>
  <container>
    <sprite :texture="planeImg"></sprite>
    <rect :x="10" :y="110"></rect>
    <rectInner :x="10" :y="110" :width="props.bloodVolume/2"></rectInner>
  </container>
</template>
<script>
import planeImg from "../assets/images/plane.png";
import { ref, reactive, onMounted, onUnmounted } from "vue";
// import { reactive } from "vue";
import config from "../config";
let _emit;
export default {
  props: ["bloodVolume"],
  setup(props, { emit }) {
    _emit = emit;
    return {
      planeImg,
      props
    };
  }
};
export function usePlane(onAttack) {
  // 飞机数据
  const planeInfo = reactive({
    x: 230,
    y: 1080,
    width: config.plane.width,
    height: config.plane.height,
    speed: config.plane.speed,
    bloodVolume: config.plane.bloodVolume
  });
  const initPlanePositioned = ref(true);
  // 初始化飞机位置 -> 底部飞出
  const initPlanePosition = setInterval(() => {
    planeInfo.y -= planeInfo.speed;
    if (planeInfo.y <= 900) {
      initPlanePositioned.value = true;
      clearInterval(initPlanePosition);
    }
  }, 60);

  // 飞机移动
  const move = e => {
    if (initPlanePositioned.value) {
      if (e.code === "ArrowUp" && planeInfo.y > 0) {
        planeInfo.y -= planeInfo.speed;
      } else if (
        e.code === "ArrowDown" &&
        planeInfo.y <= config.container.height - config.plane.height
      ) {
        planeInfo.y += planeInfo.speed;
      } else if (e.code === "ArrowLeft" && planeInfo.x > 0) {
        planeInfo.x -= planeInfo.speed;
      } else if (
        e.code === "ArrowRight" &&
        planeInfo.x < config.container.width - config.plane.width
      ) {
        planeInfo.x += planeInfo.speed;
      }
    }
  };
  // game over
  const gameOver = () => {
    _emit("changePage", "endPage");
  };
  // 飞机受到攻击
  const hurtPlane = hurtVal => {
    planeInfo.bloodVolume -= hurtVal;
    if (planeInfo.bloodVolume <= 0) {
      gameOver();
    }
  };
  // 飞机攻击 -> 发射子弹
  const attack = e => {
    if (initPlanePositioned.value) {
      if (e.code === "Space") {
        onAttack &&
          onAttack({
            x: planeInfo.x + 20,
            y: planeInfo.y - 20
          });
      }
    }
  };
  onMounted(() => {
    window.addEventListener("keydown", move);
    window.addEventListener("keyup", attack);
  });
  onUnmounted(() => {
    window.removeEventListener("keydown", move);
    window.removeEventListener("keyup", attack);
  });
  return {
    planeInfo,
    hurtPlane
  };
}
</script>
