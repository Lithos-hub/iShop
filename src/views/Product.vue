<template>
  <section class="product">
    <article class="product__wrapper">
      <header class="product__header">
        <h1 class="text--black">{{ product.title }}</h1>
      </header>
      <div class="product__body">
        <img :src="product.image" :alt="'Product name: ' + product.title" />
        <div class="product__rating">
          <mdicon
            class="rating__stars"
            v-for="i in parseInt(rateNumber)"
            name="star"
            size="30"
          />
          <p>{{ rateNumber }}</p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = route.params.id;
let product = ref({});
let rateNumber = ref("");

const getProductDetails = () => {
  axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .then((response) => {
      product.value = response.data;
      const {
        rating: { rate },
      } = response.data;
      rateNumber.value = rate;
    });
};

onMounted(() => getProductDetails());
</script>

<style lang="scss" scoped>
@import "../scss/app.scss";
@import "../scss/variables";

.product__wrapper {
  background: white;
  border-radius: 25px;
  padding: 25px;

  h1 {
    font-size: 2em;
  }

  img {
    max-width: 250px;
  }
}

.product__body {
  display: flex;
}

.product__rating {
  position: relative;
  text-align: center;
  width: auto;

  p {
    font-size: 1.5em;
    font-weight: bold;
    color: black;
  }
}

.rating__stars {
  color: goldenrod;
}
</style>
