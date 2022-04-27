<template>
  <div class="app">
    <div class="sticky" v-if="this.$route.path !== '/'">
      <Navbar />
    </div>
      <Header id="shop__categoriesMenu" v-if="this.$route.path === '/shop'" /> 
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Header from "./components/Header.vue";
import { watch } from "vue";

window.onScroll = () => document.body.scrollTop > 80 || document.documentElement.scrollTop > 80;
watch(() => console.log(window.onScroll()));
</script>

<style lang="scss">
@import './scss/variables';

.sticky {
  position: sticky;
  z-index: 9999;
  top: 0;
  left: 0;
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 2px 5px black, 0px 5px 10px #101010;
  color: #151515;
  padding: 0 auto;
}

#shop__categoriesMenu {
  position: sticky;
  z-index: 9999;
  top: 6.3vh;
  left: 0;
  width: 100%;
  height: 80px;
}

.app {
  background: #202020;
}

html, body {
  margin: 0 auto;
  padding: 0 auto;
  background: #202020;
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
