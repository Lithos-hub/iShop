<template>
  <div>
    <div class="sticky" v-if="route.path !== '/'">
      <Navbar />
    </div>
      <Header id="shop__categoriesMenu" v-if="route.path === '/shop'" /> 
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Header from "./components/Header.vue";
import { listenScroll } from "./utils/scrollFX";
import { useRoute } from 'vue-router';
import { onMounted, watch } from "vue";
import { useUserStore } from "./stores/user";

const route = useRoute()
const userStore = useUserStore()

watch(() => route.path, (newPath) => {
  newPath === '/shop' ? window.onscroll = () => listenScroll() : window.onscroll = null
})

onMounted(() => userStore.currentUser());

</script>

<style lang="scss">
@import './scss/_variables.scss';

.sticky {
  position: sticky;
  z-index: 9999;
  top: 0;
  left: 0;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 10px #404040;
  color: #151515;
  padding: 0 auto;
}

#shop__categoriesMenu {
  position: sticky;
  z-index: 99;
  height: 40px;
  top: 0;
  left: 0;
  width: 100%;
}

html, body {
  margin: 0 auto;
  padding: 0 auto;
  background: #ebebeb;
  background-repeat: no-repeat;
  color: $textPrimary;
}

* {
  font-family: "Oxygen", sans-serif;
}

.main-container {
  position: relative;
  margin-block: 10vh;
  margin-inline: 8vh;
}
</style>
