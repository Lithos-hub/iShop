import { defineStore } from "pinia";
import { useSnackbarStore } from "./Snackbar";
import axios from "axios";
import router from "../router";

export const useProductStore = defineStore("useProduct", {
  state: () => ({
    isLoading: true,
    showTimeWarning: false,
    componentKey: 0,
    timeResponse: 0, // => time to get response from server
    productsList: [],
    categoriesList: [],
    searchQuery: "",
  }),
  actions: {
    async getCategories() {
      if (!this.categoriesList.length) {
        await axios
          .get("https://fakestoreapi.com/products/categories")
          .then((res) => {
            this.componentKey++;
            this.categoriesList = res.data;
          })
          .catch((err) => {
            this.componentKey++;
            console.log("Error when getting categories: ", err);
          });
      } else {
        return;
      }
    },
    async getStoreProducts(
      isFiltering = false,
      query = "",
      isByCategory = false
    ) {
      const snackbarStore = useSnackbarStore();

      this.productsList = [];
      let responseNow = null;
      let responseThen = null;
      let counter = 0;
      if (!this.productsList.length) {
        this.isLoading = true;
        responseNow = new Date(Date.now());
        const countTimeResponse = setInterval(() => {
          counter += 1;
          if (counter === 5) {
            snackbarStore.showSnackbar(
              "warning",
              "Server response is taking a little while... Please, wait."
            );
          }
        }, 1000);
        await axios
          .get("https://fakestoreapi.com/products")
          .then((res) => {
            clearInterval(countTimeResponse);
            this.componentKey++;
            if (isFiltering && query && !isByCategory) {
              this.productsList = res.data.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
              );
            } else if (isFiltering && query && isByCategory) {
              this.productsList = res.data.filter(
                (product) => product.category === query
              );
            } else {
              this.productsList = res.data;
            }
            responseThen = new Date(Date.now());
            this.isLoading = false;
            this.timeResponse =
              (responseThen.getTime() - responseNow.getTime()) / 1000;
          })
          .catch((err) => {
            this.componentKey++;
            snackbarStore.showSnackbar("error", err.message);
          });
      } else {
        return;
      }
    },
    async filterProducts() {
      this.getStoreProducts(true, this.searchQuery);
    },
    async getProductsByCategory(category) {
      this.getStoreProducts(true, category, true);
    },
    goProductDetails(id) {
      router.push(`/product/${id}`);
    },
  },
});
