import {
  db,
  collection,
  updateDoc,
  doc,
  setDoc,
  getDocs,
  arrayRemove,
  query,
  deleteDoc,
} from "../firebase.config";
import { useUserStore } from "../stores/User";

class CartProduct {
  getCartProducts() {
    let cartProducts = [];
    const userStore = useUserStore();
    const {
      user: { uid },
    } = userStore;

    return new Promise(async (resolve) => {
      const q = query(collection(db, "users", uid, "cart"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        cartProducts.push(docData);
      });
      resolve(cartProducts);
    });
  }

  async addCartProduct(product) {
    const userStore = useUserStore();
    const {
      user: { uid },
    } = userStore;

    try {
      await setDoc(
        doc(db, "users", uid, "cart", `product-id-${product.id}`),
        product
      );
    } catch (error) {
      console.log("Error adding product => ", error);
    }
  }

  async clearCart() {
    const userStore = useUserStore();
    const {
      user: { uid },
    } = userStore;
    const productsList = await this.getCartProducts();
    for (let product of productsList) {
      await deleteDoc(doc(db, "users", uid, "cart", `product-id-${product.id}`));
    }
  }

  deleteSingleCartProduct(product) {
    const userStore = useUserStore();
    const {
      user: { uid },
    } = userStore;

    return new Promise((resolve) => {
      const docRef = doc(db, "users", uid);
      const response = updateDoc(docRef, {
        cart: arrayRemove(product),
      });
      resolve(response);
    });
  }
}

export default new CartProduct();
