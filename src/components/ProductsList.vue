<template>
  <div>
    <h3 class="text--black shop__results">{{ products.length }} {{ products.length === 1 ? 'resultpapa' : 'results' }}</h3>
    <div class="grid">
      <div v-for="product in products">
        <div class="col">
          <ProductCard :key="componentKey" :product="product" @click="goProductDetails(product.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import { useProductStore } from "../stores/Product";
import ErrorComponent from "./ErrorComponent.vue";

const ProductCard = defineAsyncComponent({
  loader: () => import("./ProductCard.vue"),
  delay: 200,
  errorComponent: ErrorComponent,
  timeout: 5000,
});

const props = defineProps({
  products: {
    type: Array,
  },
  componentKey: {
    type: Number,
  },
});

const productStore = useProductStore();

const goProductDetails = (id) => {
  productStore.goProductDetails(id);
};

const { products } = props;
</script>

<style lang="scss" scoped>
@import "../scss/variables.scss";
@import "../scss/app.scss";
</style>
