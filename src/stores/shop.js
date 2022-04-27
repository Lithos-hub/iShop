import { defineStore } from "pinia";
import axios from "axios";

const useShopStore = defineStore("useShop", {
  state: () => ({
    isLoading: true,
    timeResponse: 0, // => time to get response from server
    productsList: [],
    categoriesList: [],
  }),
  actions: {
    async getCategories() {
      if (!this.categoriesList.length) {
        try {
          await axios.get("https://fakestoreapi.com/products/categories")
          .then((res) => {
            this.categoriesList = res.data;
          })
          .then(() => {

          })
        } catch (err) {
          console.log("Error when getting categories: ", err);
        } finally {
          this.isLoading = false;
        }
      } else {
        return;
      }
    },
    async getStoreProducts() {
      let responseNow = null;
      let responseThen = null
      if (!this.productsList.length) {
        this.isLoading = true;
        responseNow = new Date(Date.now())
        try {
          await axios.get("https://fakestoreapi.com/products").then((res) => {
            this.productsList = res.data;
            responseThen = new Date(Date.now())
            this.timeResponse = (responseThen.getTime() - responseNow.getTime()) / 1000;
          });
        } catch (err) {
          console.log("Error when getting all products: ", err);
        } finally {
          this.isLoading = false;
        }
      } else {
        return;
      }
    },
  },
});

export { useShopStore };
