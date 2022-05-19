<template>
    <div>
      <router-link to="/checkout" class="text-none">
        <button class="checkoutButton button__special" @click="useNavigation.goTo('/checkout')">
        {{ items ? `Checkout ${items.length > 1 ? "products" : "product"}` : 'Checkout' }}
        </button>
      </router-link>
    </div>
</template>

<script setup>
import { useNavigationStore } from "../stores/Navigation";

const props = defineProps({
    items: {
        type: Array,
        required: false,
    }
})

const { items } = props;

const useNavigation = useNavigationStore();

</script>

<style lang="scss" scoped>
@import "../scss/app.scss";
@import "../scss/variables.scss";

.checkoutButton {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: auto;
  transition: all 0.3s ease-out;
  padding: 10px 20px;
  margin: 0 auto;
  border-radius: 20px;
  border: none;
  background: $gradientPrimary;
  color: white;
  font-size: 18px;

  &:hover {
    box-shadow: 0px 5px 10px #40404084;
  }
}

</style>