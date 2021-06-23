<template>
  <container>
    <sprite :interactive="true" @click="startGame" :texture="startPageImg"></sprite>
  </container>
</template>
<script>
import startPageImg from "../assets/images/start_page.jpg";
export default {
  setup(props, { emit }) {
    const startGame = () => {
      emit("changePage", "gamePage");
    };
    return {
      startPageImg,
      startGame
    };
  }
};
</script>
