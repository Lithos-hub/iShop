import {defineStore} from 'pinia';

export const useCartStore = defineStore('useCart', {
    state: () => ({
        items: [
            {
                "id": 2,
                "title": "Mens Casual Premium Slim Fit T-Shirts ",
                "price": 22.3,
                "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                "rating": {
                    "rate": 4.1,
                    "count": 259
                }
            },
            {
                "id": 8,
                "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
                "price": 10.99,
                "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
                "category": "jewelery",
                "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
                "rating": {
                    "rate": 1.9,
                    "count": 100
                }
            },
            {
                "id": 17,
                "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
                "price": 39.99,
                "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
                "category": "women's clothing",
                "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
                "rating": {
                    "rate": 3.8,
                    "count": 679
                }
            }
        ],
    }),
    getters: {
        getCartLength: state => state.items.length,
        getItems: state => state.items,
    },
    actions: {
        addProduct(payload) {
            this.items.push(payload);
        },
        mapProducts(payload) {
            this.items = payload;
        },
        removeSingle(payload) {
            this.items.splice(payload, 1);
        }
    }
});