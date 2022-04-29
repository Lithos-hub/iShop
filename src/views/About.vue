<template>
  <section class="about">
    <div class="fixed__centered">
      <h3 class="text__gradient--secondary">
        iShop is a <strong>Single Page Application</strong> made with Vue 3
        powered by Vite and Pinia
      </h3>
      <h3 class="text__gradient--secondary">
        This is a fake store, but your user experience will be similar to a real
        web store
      </h3>
      <h3 class="text__gradient--secondary">
        If you are reading this, you have signed up using Google Firebase
        authentication and an anonymous account
      </h3>
      <h3 class="text__gradient--secondary">
        All the data you provide will not be stored in the backend, you can use
        fake data of course
      </h3>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../scss/app.scss";

.about {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #151515;
}

h3 {
  margin-block: 3em;
}
</style>
