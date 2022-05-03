import {defineStore} from 'pinia';
import Services from '../services/Services';

export const useUserStore = defineStore("userStore", {
    state: () => ({
        user: null,
    }),
    actions: {
        async login() { await Services.signAsAnon() },
        async logout() { await Services.logout() },
        async currentUser() {
            let user = await Services.getCurrentUser();
            if (user) {
                this.user = user
                return user;
            } else {
                return null;
            }
        }
    }
})