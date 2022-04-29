<template>
  <section class="home reflections fixed__centered">
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
  </section>
  <section class="version__wrapper">
    <small>{{ version }}</small>
  </section>
</template>

<script setup>
import { ref } from "vue";

const mayor = ref(0);
const minor = ref(5);
const patch = ref(0);
const version = `V${mayor.value}.${minor.value}.${patch.value}`;

</script>

<style lang="scss" scoped>
@import "../scss/app.scss";

.home {
  border-radius: 25px;
  padding: 50px;
  box-shadow: 0px 5px 30px #202020;
}

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

.version__wrapper {
  position: fixed;
  bottom: 1vh;
  left: 1vh;
  background: #202020;
  border-radius: 5px;
  padding: 10px;
}
</style>
