<template>
  <header>
    <div class="header__button--wrapper" v-for="category in categories">
      <button
        :class="categoryColor(category)"
        @click="searchByCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useProductStore } from "../stores/product";
import { useRoute, useRouter } from "vue-router";

const shopStore = useProductStore();
const router = useRouter();
const route = useRoute();

let categories = computed(() => shopStore.categoriesList);

const categoryColor = (category) => {
  const badgeClasses = {
    [`men's clothing`]: "category__primary",
    [`women's clothing`]: "category__secondary",
    [`jewelery`]: "category__tertiary",
    [`electronics`]: "category__quaternary",
  };
  return badgeClasses[category];
};

const searchByCategory = (category) => {
  shopStore.getProductsByCategory(category)
  router.push(`/shop?category=${category}`);
};

onMounted(() => {
  shopStore.getCategories();
});
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/app";

header {
  display: flex;
  position: relative;
  width: 100%;
  justify-content: center;
}

.header__button--wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  border: none;
  background: none;
  color: #fff;
  cursor: pointer;

  button {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;
    border-radius: 10px;
    width: 150px;
    height: 33px;
    margin-inline: 15px;
    text-transform: capitalize;
    font-size: 0.8rem;
    color: white;

    &:hover {
      background: white;
      color: #202020;
    }
  }
}
</style>
