<template>
  <div :class="'card__badge ' + colorBadge(props.product.category)">
    {{ props.product.category }}
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const colorBadge = (category) => {
  const badgeClasses = {
    [`men's clothing`]: "category__primary",
    [`women's clothing`]: "category__secondary",
    [`jewelery`]: "category__tertiary",
    [`electronics`]: "category__quaternary",
  };
  return badgeClasses[category];
};
</script>

<style lang="scss">

</style>
