<template>
  <container>
    <sprite :texture="endPageImg"></sprite>
    <sprite x="230" y="450" :interactive="true" @click="startGame" :texture="restartBtnImg"></sprite>
  </container>
</template>
<script>
import endPageImg from "../assets/images/end_page.jpg";
import restartBtnImg from "../assets/images/restart_btn.png";
export default {
  setup(props, { emit }) {
    const startGame = () => {
      emit("changePage", "gamePage");
    };
    return {
      endPageImg,
      restartBtnImg,
      startGame
    };
  }
};
</script>
