<template>
<header>
    <div class="header__button--wrapper" v-for="category in categories">
        <button :class="categoryColor(category)">{{ category }}</button>
    </div>
</header>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useShopStore } from "../stores/shop";

const shopStore = useShopStore();

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

onMounted(() => {
    shopStore.getCategories();
});
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/app';

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
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    cursor: pointer;

    button {
        cursor: pointer;
        transition: all .3s ease-in-out;
        padding: 5px;
        border: none;
        border-radius: 10px;
        width: 150px;
        height: 40px;
        margin-inline: 15px;
        text-transform: capitalize;
        font-size: 1rem;
        color: white;

        &:hover {
            background: white;
            color: #202020;
        }
    }
}
</style>