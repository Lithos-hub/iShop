<template>
  <div class="card" @click="goProductDetails(product.id)">
    <CardBadge
      class="card__badge"
      :product="product"
      :badge-class="product.category"
    />
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
</template>

<script setup>
import { useRouter } from "vue-router";
import CardBadge from "./CardBadge.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const { product } = props;

const router = useRouter();
const goProductDetails = (id) => router.push(`/product/${id}`);
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
.card__badge {
  position: absolute;
  top: 0;
  right: 0;
}

</style>
