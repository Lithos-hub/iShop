<template>
  <section class="index">
    <button
      @click="userStore.login()"
      @mouseover="changeText(true)"
      @mouseout="changeText(false)"
    >
      <span id="first-text">{{ text }}</span>
      <span id="second-text">{{ newText }}</span>
    </button>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

let text = ref("Enter");
let newText = ref(`Let's buy something!`);
const changeText = (change) => {
  let firstText = document.querySelector("#first-text");
  let secondText = document.querySelector("#second-text");
  if (change) {
    firstText.style.opacity = 0;
      secondText.style.opacity = 1;
    setTimeout(() => {
      secondText.style.display = "block";
      firstText.style.display = "none";
    }, 1000);
  } else {
    secondText.style.opacity = 0;
    firstText.style.opacity = 1;
    setTimeout(() => {
      firstText.style.display = "block";
      secondText.style.display = "none";
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";

.index {
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: auto;
  align-items: center;
}

button {
  transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin: 0 auto;
  cursor: pointer;
  width: 80px;
  height: 60px;
  font-size: 1em;
  border: none;
  border-radius: 10px;
  background: $gradientPrimary;
  color: white;

  &:hover {
    height: 100vh;
    width: 100vw;
    border-radius: 0px;
  }
}

#first-text {
  transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 1;
}
#second-text {
  transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0;
  display: none;
}

small {
  font-size: 12px;
}
</style>
