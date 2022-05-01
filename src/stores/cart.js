import {defineStore} from 'pinia';

export const useCartStore = defineStore('useCart', {
    state: () => ({
        items: [],
        cartNotification: {
            show: false,
            color: "",
            message: ""
        },
    }),
    getters: {
        getCartLength: state => state.items.length,
        getItems: state => state.items,
    },
    actions: {
        addProduct(product, quantity) {
            if (!this.items.find(item => item.id === product.id)) {
                this.items.push({ ...product, quantity });
                this.showSnackbar('success', 'Product added to cart');
            } else {
                this.items.at(this.items.indexOf(product)).quantity += quantity;
                this.showSnackbar('success', 'Product quantity updated');
            }
        },
        getExistsProduct(productId) {
            return this.items.find(item => item.id === productId)
        },
        mapProducts(payload) {
            this.items = payload;
        },
        removeSingle(payload) {
            this.items.splice(payload, 1);
        },
        showSnackbar(color, message) {
            this.cartNotification = {
                show: true,
                color: color,
                message: message
            }
            setTimeout(() => this.hideSnackbar(), 3000);
        },
        hideSnackbar() {
            this.cartNotification = {
                show: false,
                color: "",
                message: ""
            }
        }
    }
});