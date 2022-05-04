import {
  auth,
  signAnon,
  db,
  collection,
  doc,
  setDoc,
  onAuthStateChanged,
} from "../firebase.config";

import { useUserStore } from "../stores/User";
import router from "../router";

class Auth {
  constructor() {
    this.auth = auth;
    this.user = null;
  }

  getCurrentUser() {
    const userStore = useUserStore();
    return new Promise((resolve) => {
      const unsuscribe = onAuthStateChanged(auth, (user) => {
        userStore.user = user;
        resolve(user);
      });
      unsuscribe();
    });
  }

  async signAsAnon() {
    let response = null;
    await signAnon(auth)
      .then(() => {
        const docRef = doc(collection(db, "users"));
        setDoc(docRef, {
          docId: docRef.id,
        });
        localStorage.setItem("docId", docRef.id);
        response = "OK";
        console.log("Logged in");
        router.push("/home");
      })
      .catch((error) => {
        response = "Error: " + error;
      });

    return response;
  }

  async logout() {
    const userStore = useUserStore();
    await auth.signOut().then(() => {
      console.log("Logged out");
      router.push("/");
      userStore.user = null;
    });
  }
}

export default new Auth();
