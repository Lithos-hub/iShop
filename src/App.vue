<template>
  <div class="app">
    <div v-if="this.$route.path !== '/'">
      <Navbar />
      <!-- <Header id="app__header" />  -->
    </div>
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

.navbar__header--wrapper {
  position: sticky;
  z-index: 9999;
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
