<template>
  <div
    class="floatCart__wrapper"
    :style="`top: ${clientY}px; left: ${clientX}px`"
  >
    <div class="floatCart">
      <header class="floatCart__title">
        <h2>Shopping cart</h2>
      </header>
      <section class="floatCart__body">
        <ul>
          <li class="d-flex" v-for="product in items" @click="goProductDetails(product.id)">
            <img :src="product.image" :alt="'cart item: ' + product.title" />
            <span class="floatCart__productDesc">{{ product.title }}</span>
            <span class="ml-1">{{ product.price }}€</span>
            <p class="ml-1">({{ product.quantity }})</p>
          </li>
        </ul>
      </section>
      <footer class="floatCart__footer">
        <h5>Subtotal: {{ subtotal }}€</h5>
        <button class="floatCart__checkoutBtn">
            Checkout
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useProductStore } from "../stores/product";
const productStore = useProductStore();
const cartStore = useCartStore();
const items = computed(() => cartStore.items);
const subtotal = computed(() => cartStore.getCartSubtotal);
const props = defineProps({
  clientY: {
    type: Number,
  },
  clientX: {
    type: Number,
  },
  items: {
    type: Array,
  },
});

const { clientY, clientX } = props;

const goProductDetails = (id) => {
  productStore.goProductDetails(id);
};

</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";
@import "../scss/app.scss";

.floatCart__wrapper {
  position: fixed;
  height: 450px;
  width: 350px;
  z-index: 999999;
}
.floatCart {
  background: white;
  box-shadow: 0px 2px 10px #404040;
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}

.floatCart__title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  background: $gradientPrimary;
  color: white;
  font-weight: bold;

  h2 {
    margin-left: 20px;
  }
}

.floatCart__body {
  position: absolute;
  top: 13vh;
  width: 100%;
  max-height: 320px;
  overflow-y: scroll;
}

ul {
  margin: 0;
  padding: 5px;
}

li {
  transition: all .3s ease-out;
  display: flex;
  width: 90%;
  justify-content: flex-start;
  padding: 15px;
  cursor: pointer;
  margin-block: 5px;

  &:hover {
    background: rgba(255, 0, 166, 0.259);
    border-radius: 10px;
  }
}

img {
  width: 35px;
  height: auto;
  margin-right: auto;
  padding: 0;
}

.floatCart__productDesc {
    font-size: 12px;
    padding: 0 auto;
    margin-inline: 10px;
}

.floatCart__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 0px 0px 10px 10px;
  font-weight: bold;
  border-top: 1px solid gray;
  h5 {
    margin-block: auto;
    margin-left: 25px;
  }
}

.floatCart__checkoutBtn {
    transition: all .3s ease-out;
    cursor: pointer;
    background: $gradientPrimary;
    border: none;
    border-radius: 10px;
    margin-right: 25px;
    padding-inline: 10px;
    color: white;
    height: 30px;
    margin-block: auto;

    &:hover {
        transform: scale(1.1);
    }
}
</style>
