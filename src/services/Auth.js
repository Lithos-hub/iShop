import {
  auth,
  collection,
  deleteUser,
  signAnon,
  db,
  doc,
  setDoc,
  addDoc,
  onAuthStateChanged,
  deleteDoc,
  getDoc,
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

  signAsAnon() {
    let response = null;
    signAnon(auth)
      .then(async (res) => {
        const {
          user: { uid },
        } = res;
        console.log("Setting docs...");
        try {
          await setDoc(doc(db, "users", uid), {
            userUid: uid,
          });
        } catch (error) {
          console.log("Error when setting docs => ", error);
        }

        localStorage.setItem("uid", auth.uid);
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
    const user = auth.currentUser;
    await auth.signOut().then(() => {
      console.log("Logged out");
      router.push("/");
      userStore.user = null;
    });
    deleteUser(user)
      .then(() => console.log("User deteled"))
      .catch((err) => console.log("Error when deleting user => ", err));
    await deleteDoc(doc(db, "users", user.uid));
    localStorage.setItem("uid", null);
  }
}

export default new Auth();
