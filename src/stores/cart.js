import {defineStore} from 'pinia';

export const useCartStore = defineStore('useCart', {
    state: () => ({
        items: ['patata', 'boniato'],
    }),
    getters: {
        getCartLength: state => state.items.length,
        getItems: state => state.items,
    },
    actions: {
        addProduct(payload) {
            this.items.push(payload);
        },
        removeProduct(payload) {
            this.items.splice(payload, 1);
        }
    }
});