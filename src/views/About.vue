<template>
  <section class="about">
    <div class="about__text--wrapper fixed__centered">
      <h2 class="text__gradient--primary">
        iShop is a <strong>Single Page Application</strong> made with <strong>Vue 3</strong>
        powered with <strong>Vite</strong> and <strong>Pinia</strong>.
      </h2>
      <h2 class="text__gradient--primary">
        This is a fake store, but your user experience will be similar to a <strong>real
        web store</strong>.
      </h2>
      <h2 class="text__gradient--primary">
        If you are reading this, you have signed up using <strong>Google Firebase</strong>
        authentication and an anonymous account.
      </h2>
      <h2 class="text__gradient--primary">
        All the data you provide will not be stored in the backend, you can use
        fake data of course.
      </h2>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../scss/app.scss";

.about__text--wrapper {
  background: #151515;
  border-radius: 25px;
  padding: 10px 35px;
  min-width: 1000px;
}

h2 {
  margin-block: 2em;
  width: 100%;
}

strong {
  font-weight: bolder;
  font-size: 1.3em;
  background: linear-gradient(to right, #001eff, #00eaff);
  filter: brightness(2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
