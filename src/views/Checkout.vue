<template>
  <DialogMessage
    message="Order completed!"
    class="dialogMessage"
    v-if="showDialog"
  />
  <div class="checkout">
    <div class="container__left">
      <h1>Checkout {{ items.length === 1 ? "item" : "items" }}</h1>
      <ul>
        <li class="checkout__item" v-for="item in items">
          <article class="d-flex">
            <section class="d-flex start">
              <div>
                <img :src="item.image" :alt="item.title + ' picture'" />
              </div>
              <div>
                <h3>{{ item.title }}</h3>
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
        <button class="absolute__bottom buyButton" @click="buyProducts">
          Buy
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
// VUEX & UTILS
import { useCartStore } from "../stores/Cart";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import router from "../router";
import DialogMessage from "../components/DialogMessage.vue";

const cartStore = useCartStore();
const showDialog = ref(false);
const { items } = storeToRefs(cartStore);
const noDisccounted = computed(() => cartStore.getCartSubtotal);
const disccounted = cartStore.getCartSubtotal;

const buyProducts = () => {
  showDialog.value = true;

  setTimeout(async () => {
    showDialog.value = false;
    await cartStore.clearCart();
    cartStore.getCartItems();
    router.push("/home");
  }, 4000);
};
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/app";

.checkout {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 50px;
}

ul {
  padding: 0;
  margin: 0;

  article {
    justify-content: space-between;
  }
}
.checkout__item {
  padding: 1em;
  border-bottom: 1px solid #50505055;
  img {
    width: 70px;
    height: auto;
  }
  h3 {
    color: black;
    margin-left: 2em;
  }
}

.container__left {
  position: relative;
  background: white;
  padding: 2em;
  width: 100%;
  border-radius: 25px;

  h1 {
    color: black;
  }
}

.container__right {
  position: relative;
  background: white;
  width: 500px;
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

.buyButton {
  cursor: pointer;
  position: absolute;
  width: auto;
  height: auto;
  transition: all 0.3s ease-out;
  padding: 10px;
  margin-inline: 20px;
  border-radius: 20px;
  border: none;
  background: $gradientPrimary;
  color: white;
  font-size: 18px;

  &:hover {
    box-shadow: 0px 5px 10px #40404084;
  }
}
</style>
