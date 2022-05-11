<template>
  <div class="checkout">
    <div class="container__left">
      <h1>Checkout</h1>
      <ul>
        <li class="checkout__item" v-for="item in items">
          <article class="d-flex">
            <section class="d-flex start">
              <div>
                <img :src="item.image" :alt="item.title + ' picture'" />
              </div>
              <div>
                <h2>{{ item.title }}</h2>
              </div>
            </section>
            <section>
              <h2>{{ item.price }}€</h2>
            </section>
          </article>
        </li>
      </ul>
    </div>
    <div class="container__right">
      <h2>Total: {{ disccounted > 0 ? disccounted : noDisccounted }}€</h2>
      <section>
        <button class="absolute__bottom checkoutButton">Buy</button>
      </section>
    </div>
  </div>
</template>

<script setup>
// VUEX & UTILS
import { useCartStore } from "../stores/Cart";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { items } = storeToRefs(cartStore);
const noDisccounted = computed(() => cartStore.getCartSubtotal);
const disccounted = cartStore.getCartSubtotal;
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/app";

.checkout {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 25px;
}

ul {
  padding: 0;
  margin: 0;

  article {
    justify-content: space-between;
  }
}
.checkout__item {
  padding: 2em;
  border-bottom: 1px solid #505050;
  img {
    width: 100px;
  }
  h2 {
    color: black;
    margin-left: 2em;
  }
}

.container__left {
  position: relative;
  background: white;
  padding: 1em;
  width: 100%;
  border-radius: 25px;

  h1 {
    color: black;
  }
}

.container__right {
  position: relative;
  background: white;
  width: 25vw;
  height: auto;
  border-radius: 25px;

  h2 {
    color: #202020;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
