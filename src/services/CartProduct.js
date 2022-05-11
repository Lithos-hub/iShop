import { getDoc } from "firebase/firestore";
import {
    db,
    updateDoc,
    doc,
    arrayUnion, 
    arrayRemove
  } from "../firebase.config";
import { useUserStore } from '../stores/User'

class CartProduct {
    addCartProduct(product) {
        const userStore = useUserStore();
        const {
            user: { uid },
        } = userStore;

        return new Promise((resolve) => {
            const docRef = doc(db, "users", uid)
            const response = updateDoc(docRef, {
                'cart': arrayUnion(product)
            });
            resolve(response);
        })
    }

    getCartProducts() {
        const userStore = useUserStore();
        const {
            user: { uid },
        } = userStore;

        return new Promise(async (resolve) => {
            const docRef = doc(db, "users", uid)
            const response = await getDoc(docRef);
            if (response.exists()) {
                resolve(response.data().cart);
            } else {
                resolve([]);
            }
        })
    }

    updateCartProduct() {

    }

    deleteSingleCartProduct(product) {
        const userStore = useUserStore();
        const {
            user: { uid },
        } = userStore;

        return new Promise((resolve) => {
            const docRef = doc(db, "users", uid)
            const response = updateDoc(docRef, {
                'cart': arrayRemove(product)
            });
            resolve(response);
        })
    }
}

export default new CartProduct();