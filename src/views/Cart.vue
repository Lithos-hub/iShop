<template>
  <section class="cart">
    <div class="cart__list">
      <header class="cart__header">
        <h2 class="black--text">
          Shopping cart <small>({{ items.length }} items)</small>
        </h2>
        <button v-if="productsChecked.length" @click="removeMultiple">
          Remove selected
        </button>
      </header>
      <ul>
        <li class="cart__item--wrapper" v-for="product in items">
          <div class="cart__item">
            <div
              class="cart__item--innerWrapper"
              @click="toggleProduct(product)"
            >
              <div class="cart__item--check">
                <mdicon
                  name="check-circle"
                  v-show="
                    productsChecked.find((prod) => prod.id === product.id)
                  "
                />
              </div>
              <div class="cart__item--img">
                <img :src="product.image" alt="Cart product" />
              </div>
              <div class="cart__item--info">
                <h3>{{ product.title }}</h3>
                <h2 class="cart__item--price">{{ product.price }} €</h2>
                <div class="cart__item--category">
                  <CardBadge
                    class="card__badge"
                    :product="product"
                    :badge-class="product.category"
                  />
                </div>
              </div>
            </div>
            <div class="cart__item--quantityWrapper">
              <div
                class="cart__item--quantityButton remove"
                @click="deleteSingleCartProduct(product)"
              >
                <mdicon name="close-circle" />
              </div>
              <div
                class="cart__item--quantityButton increment"
                @click="increment(product)"
              >
                <mdicon name="plus" />
              </div>
              <div class="cart__item--quantityButton counter">
                {{ product.quantity }}
              </div>
              <div
                class="cart__item--quantityButton decrease"
                @click="decrease(product)"
              >
                <mdicon name="minus" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart__summary">
      <h1>Order summary</h1>
      <h3 class="cart__summary--subtotal">Subtotal: <span :class="isDisccounted ? 'disccounted danger--text' : ''">{{ subtotal }}€</span> <span class="success--text" v-if="isDisccounted">{{ subtotalDisccounted }}€ </span></h3>
      <div class="coupon--wrapper">
        <input
          placeholder="XX000000"
          v-model="couponCode"
          maxlength="8"
        /><button @click="checkCoupon()">Apply coupon</button>
      </div>
      <small class="danger--text" v-if="!correctCoupon && couponChecked"
        >Incorrect coupon format!</small
      >
      <small class="success--text" v-if="correctCoupon && couponChecked"
        >Coupon -15% applied!</small
      >
      <router-link to="/checkout" class="text-none">
        <button class="checkoutButton">
          Checkout {{ items.length > 1 ? "products" : "product" }}
        </button>
      </router-link>
    </div>
  </section>
</template>

<script setup>
// VUEX & UTILS
import { useCartStore } from "../stores/Cart";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

// COMPONENTS
import CardBadge from "../components/CardBadge.vue";

const cartStore = useCartStore();

const { items } = storeToRefs(cartStore);
const subtotal = computed(() => cartStore.getCartSubtotal);
const subtotalDisccounted = computed(() => cartStore.getCartDisccounted);

let productsChecked = ref([]);
let couponCode = ref("");
let correctCoupon = ref(false);
let couponChecked = ref(false);
let isDisccounted = ref(false);

const toggleProduct = (product) => {
  let match = productsChecked.value.find((prod) => prod === product);
  if (match) {
    productsChecked.value = productsChecked.value.filter(
      (item) => item !== product
    );
  } else {
    productsChecked.value.push(product);
  }
};

const increment = (product) => product.quantity++;
const decrease = (product) =>
  product.quantity > 1 ? product.quantity-- : null;
const deleteSingleCartProduct = (product) =>
  cartStore.deleteSingleCartProduct(product);
const removeMultiple = () =>
  productsChecked.value.forEach(
    (prod) => cartStore.deleteSingleCartProduct(prod),
    (productsChecked.value = [])
  );
const checkCoupon = () => {
  isDisccounted.value = true
  let test = /[A-Z]{2}\d{6}/.test(couponCode.value);
  if (test) {
    correctCoupon.value = true;
    couponChecked.value = true;
    const discountedProducts = items.value.map((product) => {
      return {
        ...product,
        price: parseInt(product.price) - (parseInt(product.price) * 0.15),
      };
    });
    cartStore.mapDisccountedProducts(discountedProducts);
  } else {
    correctCoupon.value = false;
    couponChecked.value = true;
  }
};
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

  h1 {
    color: black;
  }
}

.cart__item--innerWrapper {
  display: flex;
  width: 100%;
}
.cart__item {
  position: relative;
  padding-block: 20px;
  transition: 0.3s ease-out;
  display: flex;
  cursor: pointer;
  padding-inline: 20px;
  box-shadow: 0px 2px 10px #404040;
  margin-block: 20px;

  &:hover {
    transform: scale(1.02);
  }
}

.cart__header {
  display: flex;
  width: 100%;
  justify-content: space-between;

  button {
    cursor: pointer;
    transition: all 0.3s ease-out;
    border-radius: 10px;
    border: none;
    background: $textDanger;
    color: white;
    font-weight: bold;
    height: 45px;
    padding-inline: 20px;

    &:hover {
      background: #302e96;
    }
  }
}

.cart__item--check {
  margin-right: 20px;
  margin-block: auto;
  max-width: 20px;
}

.cart__item--img {
  position: relative;
  width: 100px;
  height: auto;
  margin-right: 25px;
  margin-bottom: 25px;
  margin-block: auto;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: auto;
  }
}

.cart__item--info {
  position: relative;
}

.cart__item--price {
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
}

.card__badge {
  position: relative;
  bottom: 0;
  left: 0;
  width: 80px;
  text-align: center;
  font-size: 10px;
}

.cart__item--quantityWrapper {
  display: flex;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-20%, -50%);
}

.cart__item--quantityButton {
  width: 50px;
  height: 50px;
  box-shadow: 0px 2px 2px #505050;
  background: #f5f5f5;
  margin-inline: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-out;

  &:hover:not(.counter):not(.remove) {
    background: rgb(193, 193, 193);
  }
}

.remove {
  background: $textDanger;
  color: white;

  &:hover {
    background: #962e2e;
  }
}
.counter {
  background: $textPrimary;
  color: white;
  font-size: 1.5em;
}
.cart__summary {
  text-align: center;
  position: relative;
  background: white;
  width: 30vw;
  height: 30vw;
  padding: 20px;
  border-radius: 10px;
  display: block;
}

.cart__summary--subtotal {
  text-align: center;
  color: black;
}

.coupon--wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 2em;

  input {
    padding: 10px;
    width: 100%;
    border: none;
    box-shadow: 0px 0px 3px black;

    &:focus {
      outline: none;
    }
  }

  button {
    transition: all 0.3s ease-out;
    cursor: pointer;
    padding: 5px;
    border: none;
    box-shadow: 0px 0px 3px black;
    background: $textDanger;
    color: white;
    font-weight: bold;

    &:hover {
      background: #962e2e;
    }
  }
}

.disccounted {
  text-decoration: line-through;
}
</style>
