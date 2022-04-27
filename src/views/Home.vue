<template>
  <div class="fixed__centered">
    <h2 class="text__gradient--primary">Fake Store made with</h2>
    <div class="techIcon__row">
      <div class="techIcon__wrapper">
        <img src="../assets/img/vue.png" width="80" height="80" />
        <p class="text--vue">Vue</p>
      </div>
      <h1 class="text__gradient--primary">+</h1>
      <div class="techIcon__wrapper">
        <img src="../assets/img/vite.svg" width="80" height="80" />
        <p class="text--vite">Vite</p>
      </div>
      <h1 class="text__gradient--primary">+</h1>
      <div class="techIcon__wrapper">
        <img src="../assets/img/pinia.svg" width="80" height="80" />
        <p class="text--pinia">Pinia</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../scss/app.scss";

h1 {
  font-size: 60px;
}

.techIcon__row {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
}
.techIcon__wrapper {
  width: 200px;
}
</style>
