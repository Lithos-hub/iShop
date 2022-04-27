<template>
    <div>
        {{ items }}
    </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart';

const { items } = useCartStore();


</script>

<style lang="sass" scoped>

</style>