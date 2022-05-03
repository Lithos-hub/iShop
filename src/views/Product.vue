<template>
<p class="black--text"><router-link to="/shop"> Shop</router-link> / <router-link :to="'/shop?category=' + product.category">{{product.category}}</router-link></p>
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
        <div class="d-block absolute__right">
          <h1 class="black--text text-center">{{ product.price }} €</h1>
          <div class="d-block relative">
            <input placeholder="Quantity" class="input--quantity" v-model="quantity" />
            <button class="product__add--button" @click="cartStore.addProduct(product, quantity)">Add to the cart</button>
          </div>
          <div class="d-block">
            <button class="product__checkout--button">Checkout</button>
          </div>
        </div>
      </div>
    </article>
  </section>
  <Snackbar v-if="snackbarStore.show" />
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CardBadge from "../components/CardBadge.vue";
import { useCartStore } from "../stores/cart";
import { useSnackbarStore } from "../stores/snackbar";
import Snackbar from "../components/Snackbar.vue";
import Spinner from "../components/Spinner.vue";

const route = useRoute();
const cartStore = useCartStore();
const snackbarStore = useSnackbarStore();

const productId = route.params.id;
let product = ref({});
let rateNumber = ref("");
let rateCount = ref("");
let showNavbar = ref(false);
let isLoading = ref(true);
let quantity = ref(1);
watch(() => snackbarStore.show, (newVal) => {
  if (newVal) {
    showNavbar = true;
  }
});

const getProductDetails = () => {
  const progressDiv = document.querySelector(".rating__stars--progress");
  axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => {
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
  width: 50px;
  position: relative;
  display: block;
  margin: 0 auto;
  border-radius: 2px;
  padding: 5px;
  border: none;
  box-shadow: 0px 1px 2px #404040;
  text-align: center;

  &:focus {
    outline: none;
  }
}

.product__add--button {
  transition: all .3s ease-out;
  cursor: pointer;
  background: $gradientPrimary;
  border-radius: 25px;
  border: none;
  padding: 5px;
  padding-inline: 20px;
  color: white;
  font-size: 1em;
  margin-top: 10px;
  min-width: 200px;

    &:hover {
      box-shadow: 0px 5px 10px #404040;
      transform: scale(1.05);
  }
}

.product__checkout--button {
  transition: all .3s ease-out;
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
    box-shadow: 0px 5px 10px #404040;
    transform: scale(1.05);
  }
}
</style>
