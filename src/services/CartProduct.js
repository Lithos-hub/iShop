import { getDoc } from "firebase/firestore";
import {
    db,
    collection,
    updateDoc,
    doc,
    setDoc,
    arrayUnion, 
    arrayRemove
  } from "../firebase.config";

class CartProduct {
    constructor() {
        this.docId = localStorage.getItem("docId");
    }

    addCartProduct(product) {
        return new Promise((resolve) => {
            const docRef = doc(db, "users", this.docId)
            const response = updateDoc(docRef, {
                'cart': arrayUnion(product)
            });
            resolve(response);
        })
    }

    getCartProducts() {
        return new Promise(async (resolve) => {
            const docRef = doc(db, "users", this.docId)
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
        return new Promise((resolve) => {
            const docRef = doc(db, "users", this.docId)
            const response = updateDoc(docRef, {
                'cart': arrayRemove(product)
            });
            resolve(response);
        })
    }
}

export default new CartProduct();