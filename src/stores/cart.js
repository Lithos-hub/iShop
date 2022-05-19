import { defineStore } from "pinia";
import { useSnackbarStore } from "./Snackbar";
import CartProduct from "../services/CartProduct";

export const useCartStore = defineStore("useCart", {
  state: () => ({
    items: [],
    disccountedItems: [],
  }),
  getters: {
    getCartLength: (state) => state.items.length,
    getCartSubtotal: (state) =>
      Math.round(
        state.items.reduce((a, b) => a + b.price * b.quantity, 0) * 100
      ) / 100,
    getItems: (state) => state.items,
    getCartDisccounted: (state) =>
      Math.round(
        state.disccountedItems.reduce((a, b) => a + b.price * b.quantity, 0) *
          100
      ) / 100,
  },
  actions: {
    async getCartItems() {
      console.log("Getting all cart items...");
      this.items = await CartProduct.getCartProducts();
    },
    async addProduct(productToAdd) {
      const snackbarStore = useSnackbarStore();
      
      console.log("Product to add ==> ", productToAdd);

      await CartProduct.addCartProduct(productToAdd)
        .then(() => {
          snackbarStore.showSnackbar("success", "Product added to cart");
          this.getCartItems();
        })
        .catch((err) => {
          console.log("Error when adding product to cart: ", err);
          snackbarStore.showSnackbar("error", "Error when adding product");
        });

      console.log("Addding product: ", productToAdd);
    },
    async clearCart() {
      await CartProduct.clearCart()
    },
    mapDisccountedProducts(payload) {
      this.disccountedItems = payload;
    },
    async deleteSingleCartProduct(payload) {
      await CartProduct.deleteSingleCartProduct(payload).then(() => {
        console.log("Product removed from cart");
        this.getCartItems();
      });
    },
  },
});
