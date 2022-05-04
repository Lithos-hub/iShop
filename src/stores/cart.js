import { defineStore } from "pinia";
import { useSnackbarStore } from "./Snackbar";
import CartProduct from "../services/CartProduct";

export const useCartStore = defineStore("useCart", {
  state: () => ({
    items: [],
    docId: localStorage.getItem('docId'),
  }),
  getters: {
    getCartLength: (state) => state.items.length,
    getCartSubtotal: (state) =>
      Math.round(
        state.items.reduce((a, b) => a + b.price * b.quantity, 0) * 100
      ) / 100,
    getItems: (state) => state.items,
  },
  actions: {
    async getCartItems () {
      this.items = await CartProduct.getCartProducts();
    },
    async addProduct(product, quantity) {
      // const snackbarStore = useSnackbarStore();
      // const IsProductAlreadyInCart = this.items.find((item) => item.id === product.id);

      // if (!IsProductAlreadyInCart) {
      //   this.items.push({ ...product, quantity });
      //   snackbarStore.showSnackbar("success", "Product added to cart");
      // } else {
      //   this.items.at(this.items.indexOf(product)).quantity += quantity;
      //   snackbarStore.showSnackbar("success", "Product quantity updated");
      // }

      await CartProduct.addCartProduct({ ...product, quantity })
      .then(() => {
        console.log('Product added to cart')
        console.log('Getting all cart items...')
        this.getCartItems();
      })
      .catch((err) => console.log('Error when adding product to cart: ', err));
    },
    getExistsProduct(productId) {
      return this.items.find((item) => item.id === productId);
    },
    mapProducts(payload) {
      this.items = payload;
    },
    async deleteSingleCartProduct(payload) {
      await CartProduct.deleteSingleCartProduct(payload)
      .then(() => {
        console.log('Product removed from cart')
        console.log('Getting all cart items...')
        this.getCartItems();
      })
    },
  },
});
