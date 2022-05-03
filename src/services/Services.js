import {
  auth,
  signAnon,
  db,
  collection,
  addDoc,
  onAuthStateChanged,
} from "../firebase.config";

import { useUserStore } from "../stores/user";
import router from "../router";

class Services {
  constructor() {
    this.auth = auth;
    this.user = null;
  }

  getCurrentUser() {
    const userStore = useUserStore();
    return new Promise((resolve, reject) => {
      const unsuscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          userStore.user = user;
          this.pushUserToFirestore(user);
          resolve(user);
        } else {
          reject("Error when trying to get the user");
        }
      });
      unsuscribe();
    });
  }

  async pushUserToFirestore(user) {
    const docRef = addDoc(collection(db, "users"), {
      uid: user.uid,
    });
  }

  async signAsAnon() {
    // Here we'll control if the user signs up for the first time //
    // First, the user signs in anonymously
    let response = null;
    await signAnon(auth)
      .then(async () => {
        response = "OK";
        console.log("Logged in");
        router.push("/home");
        const docRef = addDoc(collection(db, "users"), {
          uid: auth.currentUser.uid,
        });
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

export default new Services();
