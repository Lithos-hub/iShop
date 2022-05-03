<template>
  <section class="shop">
    <small class="black--text absolute__right"
      >Time: {{ productStore.timeResponse }}s</small
    >
    <Spinner v-if="isLoading" />
    <ProductsList v-else :products="products" :component-key="componentKey" />
    <Snackbar v-if="snackbarStore.show" />
  </section>
</template>

<script setup>
import { onMounted, computed, watch, defineAsyncComponent } from "vue";
import Snackbar from "../components/Snackbar.vue";
import Spinner from "../components/Spinner.vue";
import { useProductStore } from "../stores/product";
import { useRoute } from "vue-router";
import { useSnackbarStore } from "../stores/snackbar";

const ProductsList = defineAsyncComponent({
  loader: () => import("../components/ProductsList.vue"),
  delay: 200
})

const productStore = useProductStore();
const route = useRoute();
const snackbarStore = useSnackbarStore();

const category = route.query.category;

let isLoading = computed(() => productStore.isLoading);
let products = computed(() => productStore.productsList);
let searchInput = computed(() => productStore.searchQuery);
let componentKey = computed(() => productStore.componentKey);

let isSearchingByCategory = !!category;
watch(
  () => productStore.searchQuery,
  (newVal, oldVal) => {
    if (newVal === "") {
      productStore.getStoreProducts();
    } else if (newVal !== oldVal) {
      productStore.filterProducts(false);
    }
  }
);
watch(
  () => route.params.category,
  (newVal) => {
    if (newVal) {
      productStore.getProductsByCategory(newVal);
    }
  }
);

onMounted(() => {
  if (category) {
    productStore.getProductsByCategory(category);
  } else if (searchInput && !isSearchingByCategory) {
    productStore.filterProducts(false);
    productStore.searchQuery = "";
  } else {
    productStore.getStoreProducts();
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
