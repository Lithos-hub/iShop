import { defineStore } from "pinia";

import { useSnackbarStore } from "./Snackbar";

export const useCartStore = defineStore("useCart", {
  state: () => ({
    items: [],
  }),
  getters: {
    getCartLength: (state) => state.items.length,
    getItems: (state) => state.items,
  },
  actions: {
    addProduct(product, quantity) {
const snackbarStore = useSnackbarStore();

      if (!this.items.find((item) => item.id === product.id)) {
        this.items.push({ ...product, quantity });
        snackbarStore.showSnackbar("success", "Product added to cart");
      } else {
        this.items.at(this.items.indexOf(product)).quantity += quantity;
        snackbarStore.showSnackbar("success", "Product quantity updated");
      }
    },
    getExistsProduct(productId) {
      return this.items.find((item) => item.id === productId);
    },
    mapProducts(payload) {
      this.items = payload;
    },
    removeSingle(payload) {
      this.items.splice(payload, 1);
    },
  },
});
