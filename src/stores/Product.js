import { defineStore } from "pinia";
import { useSnackbarStore } from "./Snackbar";
import axios from "axios";

const useProductStore = defineStore("useProduct", {
  state: () => ({
    isLoading: true,
    timeResponse: 0, // => time to get response from server
    productsList: [],
    categoriesList: [],
    searchQuery: "",
    isSearchingByCategory: false,
  }),
  actions: {
    async getCategories() {
      if (!this.categoriesList.length) {
        try {
          await axios
            .get("https://fakestoreapi.com/products/categories")
            .then((res) => {
              this.categoriesList = res.data;
            });
        } catch (err) {
          console.log("Error when getting categories: ", err);
        } finally {
          this.isLoading = false;
        }
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
      if (!this.productsList.length) {
        this.isLoading = true;
        responseNow = new Date(Date.now());
        await axios
          .get("https://fakestoreapi.com/products")
          .then((res) => {
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
            this.timeResponse =
              (responseThen.getTime() - responseNow.getTime()) / 1000;
            this.isSearchingByCategory = false;
            this.isLoading = false;
          })
          .catch((err) => {
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
  },
});

export { useProductStore };
