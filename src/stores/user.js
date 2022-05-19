import { defineStore } from "pinia";
import Auth from "../services/Auth";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null
  }),
  actions: {
    async login() {
      await Auth.signAsAnon();
    },
    async logout() {
      await Auth.logout();
    },
    async currentUser() {
      let user = await Auth.getCurrentUser();
      if (user) {
        this.user = user;
        return user;
      } else {
        return null;
      }
    },
  },
});
