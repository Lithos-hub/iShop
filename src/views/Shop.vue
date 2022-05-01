<template>
  <section class="shop">
    <small class="text--black absolute__right">Time: {{ shopStore.timeResponse }}s</small>
    <p class="time__warning" v-if="time > 5">
        The server response is taking a little while, please wait.
    </p>
    <Spinner v-if="isLoading" />
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
import Spinner from "../components/Spinner.vue";
import { useShopStore } from "../stores/shop";
import { useRouter } from "vue-router";
const shopStore = useShopStore();

let isLoading = computed(() => shopStore.isLoading);
let products = computed(() => shopStore.productsList);

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
