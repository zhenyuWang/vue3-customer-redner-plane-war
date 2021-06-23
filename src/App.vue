<template>
  <container>
    <StartPage @changePage="changePage" v-if="currentPage==='startPage'" />
    <GamePage @changePage="changePage" v-else-if="currentPage==='gamePage'" />
    <EndPage @changePage="changePage" v-else-if="currentPage==='endPage'" />
  </container>
</template>

<script>
import { ref } from "vue";
import StartPage from "./pages/StartPage.vue";
import GamePage from "./pages/GamePage.vue";
import EndPage from "./pages/EndPage.vue";
export default {
  components: {
    StartPage,
    GamePage,
    EndPage
  },
  setup() {
    const currentPage = ref("startPage");
    const changePage = pageName => {
      currentPage.value = pageName;
    };
    return {
      currentPage,
      changePage
    };
  }
};
</script>
<style>
</style>
