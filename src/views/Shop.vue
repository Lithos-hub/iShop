<template>
  <section class="shop">
    <small class="text--black absolute__right"
      >Time: {{ shopStore.timeResponse }}s</small
    >
    <p class="time__warning" v-if="shopStore.timeResponse > 5">
      The server response is taking a little while, please wait.
    </p>
    <Spinner v-if="isLoading" />
    <div v-else>
      <h3 class="text--black shop__results">{{ products.length }} results</h3>
      <div class="grid">
        <div v-for="product in products">
          <div class="col">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <Snackbar v-if="snackbarStore.show" />
</template>

<script setup>
import { onMounted, computed, watch } from "vue";
import Spinner from "../components/Spinner.vue";
import Snackbar from "../components/Snackbar.vue";
import ProductCard from "../components/ProductCard.vue";
import { useProductStore } from "../stores/product";
import { useRoute } from "vue-router";
import { useSnackbarStore } from "../stores/snackbar";

const shopStore = useProductStore();
const route = useRoute();
const snackbarStore = useSnackbarStore();

const category = route.query.category;

let isLoading = computed(() => shopStore.isLoading);
let products = computed(() => shopStore.productsList);
let searchInput = computed(() => shopStore.searchQuery);
let isSearchingByCategory = !!category;
watch(
  () => shopStore.searchQuery,
  (newVal, oldVal) => {
    if (newVal === "") {
      shopStore.getStoreProducts();
    } else if (newVal !== oldVal) {
      shopStore.filterProducts(false);
    }
  }
);
watch(
  () => route.params.category,
  (newVal) => {
    if (newVal) {
      shopStore.getProductsByCategory(newVal);
    }
  }
);

onMounted(() => {
  if (category) {
    shopStore.getProductsByCategory(category);
  } else if (searchInput && !isSearchingByCategory) {
    shopStore.filterProducts(false);
    shopStore.searchQuery = "";
  } else {
    shopStore.getStoreProducts();
  }
});
</script>

<style lang="scss" scoped>
@import "../scss/app.scss";
@import "../scss/_variables.scss";

.time__warning {
  color: $textWarning;
  text-align: center;
}

.shop__results {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 8vh;
}
</style>
