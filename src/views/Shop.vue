<template>
  <div class="store">
    <div class="spinner" v-if="isLoading"></div>
    <div v-else>
      <h3 class="store__results">{{ products.length }} results</h3>
      <div class="row">
        <div v-for="product in products">
          <div class="col">
            <div class="card">
                <CardBadge :product="product" :badge-class="product.category" />
              <div class="card__image">
                <img :src="product.image" />
              </div>
              <div class="card__body">
                <h3>{{ product.price }} €</h3>
              </div>
              <div class="card__title">
                {{
                  product.title.length > 50
                    ? product.title.slice(0, 50) + "..."
                    : product.title
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import CardBadge from "../components/CardBadge.vue";
import { useShopStore } from "../stores/shop";

const shopStore = useShopStore();

let isLoading = computed(() => shopStore.isLoading);
let products = computed(() => shopStore.productsList);

onMounted(() => {
  shopStore.getStoreProducts();
});
</script>

<style lang="scss" scoped>
@import "../scss/app.scss";

.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 100px;
  height: 100px;
  border: 10px solid transparent;
  border-block: 10px solid #3498db;
  border-radius: 50%;
  animation: spin 1s infinite cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.store__results {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 8vh;
}

</style>
