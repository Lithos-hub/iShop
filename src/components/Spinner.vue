<template>
  <div class="spinner"></div>
</template>

<script setup></script>

<style lang="scss" scoped>
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 100px;
  height: 100px;
  border: 10px solid transparent;
  border-block: 10px solid #8F1BFF;
  border-radius: 50%;
  animation: spin 1s infinite cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
