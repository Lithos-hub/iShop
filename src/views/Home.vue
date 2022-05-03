<template>
  <section class="home reflections fixed__centered">
    <h2 class="text__gradient--primary">Fake Store made with</h2>
    <div class="techIcon__row">
      <div class="techIcon__wrapper">
        <img class="vue__image" src="../assets/img/vue.png" width="80" height="80" />
        <p class="vue--text">Vue 3</p>
      </div>
      <h1 class="text__gradient--primary">+</h1>
      <div class="techIcon__wrapper">
        <img class="vite__image" src="../assets/img/vite.svg" width="80" height="80" />
        <p class="vite--text">Vite</p>
      </div>
      <h1 class="text__gradient--primary">+</h1>
      <div class="techIcon__wrapper">
        <img class="pinia__image" src="../assets/img/pinia.svg" width="80" height="80" />
        <p class="pinia--text">Pinia</p>
      </div>
    </div>
  </section>
  <section class="version__wrapper">
    <small>{{ version }}</small>
  </section>
  <section class="github__wrapper">
    <a href="https://github.com/Lithos-hub/iShop" target="_blank">
      <mdicon name="github" size="30" />
    </a>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";
import Services from "../services/Services";

const userStore = useUserStore();

const mayor = ref(0);
const minor = ref(8);
const patch = ref(0);
const version = `V${mayor.value}.${minor.value}.${patch.value}`;

onMounted(() => Services.pushUserToFirestore(userStore.user))

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

.vue__image {
  animation: hueRotate cubic-bezier(0.445, 0.05, 0.55, 0.95) 1s infinite alternate-reverse;
}
.vite__image {
  border-radius: 20px;
  padding: 10px;
  animation: pulse cubic-bezier(0.075, 0.82, 0.165, 1) 2s infinite alternate-reverse;
}

.pinia__image {
  animation: motion cubic-bezier(0.785, 0.135, 0.15, 0.86) 1s infinite alternate-reverse;
}

@keyframes motion {
  0% {
    transform: rotate(0deg);
    margin-left: 0;
  }
  50% {
    transform: rotate(10deg);
    margin-left: 15px;
  }
  100% {
    transform: rotate(-10deg);
    margin-left: -10px;
  }
}

@keyframes pulse {
  0% {
    box-shadow: inset 0px 0px 25px magenta;
  }
  100% {
    box-shadow: inset 0px 2px 10px rgb(118, 68, 165);
  }
} 

@keyframes hueRotate {
  0% {
    filter: hue-rotate(0deg) brightness(1);
  }
  100% {
    filter: hue-rotate(-150deg) brightness(1.5);
  }
}

.github__wrapper {
  position: fixed;
  left: 6vw;
  bottom: 1.5vh;

  a {
    color: #202020;
    text-decoration: none;
  }
}
</style>
