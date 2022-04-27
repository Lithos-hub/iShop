import { defineStore } from "pinia";
import axios from "axios";

const useShopStore = defineStore("useShop", {
  state: () => ({
    isLoading: false,
    productsList: [],
    categoriesList: [],
  }),
  actions: {
    async getCategories() {
      if (!this.categoriesList.length) {
        console.log("Getting categories...");
        this.categoriesList = [];
        try {
          axios.get("https://fakestoreapi.com/products/categories").then((res) => {
            this.categoriesList = res.data;
          });
        } catch (err) {
          console.log("Error when getting categories: ", err);
        }
      } else {
        return;
      }
    },
    async getStoreProducts() {
      if (!this.productsList.length) {
        console.log("Getting products...");
        this.isLoading = true;
        try {
          axios.get("https://fakestoreapi.com/products").then((res) => {
            this.productsList = res.data;
          });
        } catch (err) {
          console.log("Error when getting all products: ", err);
        } finally {
          setTimeout(() => {
            this.isLoading = false;
          });
        }
      } else {
        return;
      }
    },
  },
});

export { useShopStore };
