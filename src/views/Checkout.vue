<template>
    <div>
        <h1>Checkout</h1>
        <ul>
            <li class="checkout__item" v-for="item in items">

            </li>
        </ul>
    </div>
</template>

<script setup>
// VUEX
import { useCartStore } from '../stores/Cart';

const cartStore = useCartStore();
const items = computed(() => cartStore.items);
</script>

<style lang="scss" scoped>

</style>