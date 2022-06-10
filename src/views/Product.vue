<template>
  <p class="black--text">
    <router-link to="/shop"> Shop</router-link> /
    <router-link :to="'/shop?category=' + product.category">{{
      product.category
    }}</router-link>
  </p>
  <Spinner v-if="isLoading" />
  <section v-show="!isLoading" class="product">
    <article class="product__wrapper">
      <header class="product__header">
        <h1 class="black--text">{{ product.title }}</h1>
        <div class="cart__item--category">
          <CardBadge
            class="card__badge"
            :product="product"
            :badge-class="product.category"
          />
        </div>
      </header>
      <div class="product__body">
        <div class="d-block">
          <img
            class="product__image"
            :src="product.image"
            :alt="'Product name: ' + product.title"
          />
          <div class="product__rating">
            <div class="rating__flex">
              <div class="rating__stars--progress"></div>
              <div class="rating__stars--progressInverse"></div>
            </div>
            <div class="rating__stars--wrapper">
              <mdicon
                class="rating__stars"
                v-for="i in 5"
                name="star"
                size="30"
              />
            </div>
            <p>{{ rateNumber }}</p>
            <small class="text--back">({{ rateCount }} ratings)</small>
          </div>
        </div>
        <div class="d-block ml-2">
          <h3>Product description</h3>
          <p class="product__description">{{ product.description }}</p>
        </div>
        <section class="d-block absolute__right">
          <h1 class="black--text text-center">{{ product.price }} €</h1>
          <div class="d-block relative">
            <input
              placeholder="Quantity"
              class="input--quantity"
              v-model="quantity"
            />
            <button
              class="product__add--button button__special"
              @click="addProductToCart"
            >
              Add to the cart
            </button>
          </div>
          <CheckoutButton class="absolute__bottom" @click="addProductToCart" />
        </section>
      </div>
    </article>
  </section>
  <Snackbar v-if="snackbarStore.show" />
</template>

<script setup>
// VUEX & UTILS
import { useCartStore } from "../stores/Cart";
import { useSnackbarStore } from "../stores/snackbar";
import axios from "axios";
import { onMounted, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";

// COMPONENTS
import CardBadge from "../components/CardBadge.vue";
import Snackbar from "../components/Snackbar.vue";
import Spinner from "../components/Spinner.vue";
import CheckoutButton from "../components/CheckoutButton.vue";

const route = useRoute();
const cartStore = useCartStore();
const snackbarStore = useSnackbarStore();

const productId = route.params.id;

const items = computed(() => cartStore.items);

let rateNumber = ref("");
let rateCount = ref("");
let showNavbar = ref(false);
let isLoading = ref(true);
let product = ref({});
let quantity = ref(1);

watch(
  () => snackbarStore.show,
  (newVal) => {
    if (newVal) {
      showNavbar = true;
    }
  }
);
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal) {
      getProductDetails(newVal);
    }
  }
);

const getProductDetails = (queryParam) => {
  const progressDiv = document.querySelector(".rating__stars--progress");
  let url = "";
  if (queryParam) {
    url = `https://fakestoreapi.com/products/${queryParam}`;
  } else {
    url = `https://fakestoreapi.com/products/${productId}`;
  }
  let counter = 0;
  const countTimeResponse = setInterval(() => {
    counter += 1;
    if (counter === 5) {
      snackbarStore.showSnackbar(
        "warning",
        "Server response is taking a little while... Please, wait."
      );
    }
  }, 1000);
  axios.get(url).then((response) => {
    clearInterval(countTimeResponse);
    isLoading.value = false;
    product.value = response.data;
    const {
      rating: { rate, count },
    } = response.data;
    rateNumber.value = rate;
    rateCount.value = count;
    progressDiv.style.minWidth = `${(rate * 147) / 5}px`;
    progressDiv.style.width = `${(rate * 147) / 5}px`;
  });
};

const addProductToCart = () => {
  const matchedExistedProduct = items.value.find((item) => item.id === product.value.id);

  console.log('Product matched ==> ', matchedExistedProduct);

  let productQuantity = matchedExistedProduct
    ? parseInt(matchedExistedProduct.quantity) + parseInt(quantity.value)
    : parseInt(quantity.value);

  const productToAdd = { ...product.value, quantity: productQuantity };

  cartStore.addProduct(productToAdd);
};

onMounted(() => getProductDetails());
</script>

<style lang="scss" scoped>
@import "../scss/app.scss";
@import "../scss/variables";

.product__wrapper {
  position: relative;
  background: white;
  border-radius: 25px;
  padding: 25px;
  padding-inline: 50px;

  h1 {
    font-size: 2em;
  }

  img {
    max-width: 250px;
  }
}

.product__body {
  display: flex;
  position: relative;
}

.product__image {
  width: auto;
  height: 200px;
  border-radius: 25px;
}

.product__rating {
  position: relative;
  margin: 0 auto;
  text-align: center;
  width: 150px;

  p {
    font-size: 1.2em;
    font-weight: bold;
    margin: 0 auto;
    color: black;
  }
}

.rating__flex {
  display: flex;
  justify-content: start;
}
.rating__stars--progress {
  display: flex;
  position: relative;
  height: 30px;
}

.rating__stars--progressInverse {
  position: relative;
  background: white;
  height: 30px;
  width: 100%;
  z-index: 10;
}

.rating__stars--wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}

.rating__stars {
  color: #f0b41b;
}

small {
  font-size: 0.8em;
}

.product__description {
  color: black;
  max-width: 450px;
}

.card__badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  padding: 10px;
  text-align: center;
  font-size: 20px;
}

.product__add--badge {
  position: absolute;
  top: 0;
  right: 0;
  color: green;
}

.input--quantity {
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  width: 100px;
  position: relative;
  display: block;
  margin: 0 auto;
  border-radius: 2px;
  padding: 5px;
  border: none;
  font-weight: bold;
  font-size: 1.2em;
  box-shadow: 0px 1px 5px #40404084;
  text-align: center;

  &:focus {
    outline: none;
    background: #151515;
    color: white;
  }
}

.product__add--button {
  transition: all 0.3s ease-out;
  cursor: pointer;
  background: $gradientPrimary;
  border-radius: 25px;
  border: none;
  padding: 25px, 25px;
  color: white;
  font-size: 1em;
  margin-top: 10px;
  width: 100%;
  height: auto;
  transition: all 0.3s ease-out;
  padding: 10px 20px;
  border-radius: 20px;
}

.product__checkout--button {
  transition: all 0.3s ease-out;
  cursor: pointer;
  background: $gradientSecondary;
  border-radius: 25px;
  border: none;
  padding: 5px;
  padding-inline: 20px;
  color: white;
  font-size: 1em;
  margin-top: 10px;
  min-width: 200px;

  &:hover {
    box-shadow: 0px 5px 10px #40404084;
    transform: scale(1.05);
  }
}
</style>
