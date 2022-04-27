<template>
  <div class="index">
    <button @click="userStore.login()">
      Enter
    </button>
    
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
const userStore = useUserStore();

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

small {
  font-size: 12px;
}
</style>
