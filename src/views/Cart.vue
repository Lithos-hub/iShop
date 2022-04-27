<template>
  <div class="cart">
    <div class="cart__list">
      <h1>My cart</h1>
      <ul>
        <li class="cart__item--wrapper">
          <div class="cart__item">
            <div class="cart__item--img">
              <img src="" alt="" />
            </div>
            <div class="cart__item--info">
              <h3>Product name</h3>
              <p>$10</p>
            </div>
            <div class="cart__item--remove">
              <mdicon name="close" size="30" />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart__summary">
        <h2>Subtotal: 180.32€</h2>
        <button>Order</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";

const { items } = useCartStore();
</script>

<style lang="scss" scoped>
@import "../scss/app.scss";
@import "../scss/variables.scss";
.cart {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 25px;
}

.cart__list {
    background: white;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
}

.cart__summary {
    background: white;
    width: 30vw;
    padding: 20px;
    border-radius: 10px;
}
</style>
