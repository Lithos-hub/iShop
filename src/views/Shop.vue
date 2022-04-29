<template>
  <section class="shop">
    <small class="text--black absolute__right">Time: {{ time }}s</small>
    <p class="time__warning" v-if="time > 5">
        The server response is taking a little while, please wait.
    </p>
    <div class="spinner" v-if="isLoading"></div>
    <div v-else>
      <h3 class="text--black shop__results">{{ products.length }} results</h3>
      <div class="grid">
        <div v-for="product in products">
          <div class="col">
            <div class="card" @click="goProductDetails(product.id)">
              <CardBadge class="card__badge" :product="product" :badge-class="product.category" />
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
  </section>
</template>

<script setup>
import { onMounted, computed } from "vue";
import CardBadge from "../components/CardBadge.vue";
import { useShopStore } from "../stores/shop";
import { useRouter } from "vue-router";
const shopStore = useShopStore();

let isLoading = computed(() => shopStore.isLoading);
let products = computed(() => shopStore.productsList);
let time = computed(() => shopStore.timeResponse);

const router = useRouter();

const goProductDetails = (id) => router.push(`/product/${id}`);
onMounted(() => {
  shopStore.getStoreProducts();
});
</script>

<style lang="scss" scoped>
@import "../scss/app.scss";
@import "../scss/_variables.scss";

.time__warning {
  color: $textWarning;
  text-align: center;
}

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

.shop__results {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 8vh;
}

.card__badge {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
