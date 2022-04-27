import {
  auth,
  signAnon,
  db,
  collection,
  addDoc,
  getDocs,
  onAuthStateChanged
} from "../firebase.config";

import { useUserStore } from "../stores/user";
import router from '../router'

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
          resolve(user);
        }
      });
      unsuscribe();
    })
  }

  async signAsAnon() {
    // Here we'll control if the user signs up for the first time //
    // First, the user signs in anonymously
    let response = null;
    await signAnon(auth)
      .then(async () => {
        response = "OK";
        console.log('Logged in');
        router.push('/home')
        let usersArr = []
        // If OK, then we get all users uid from Firestore
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          const DATA = doc.data();
          const USER_UID = DATA.uid;
          usersArr.push(USER_UID)
        });

        const CURRENT_UID = auth.currentUser.uid;
        const USER_EXISTS = usersArr.includes(CURRENT_UID);

        // If the user is not in the database, then we add him
        if (!USER_EXISTS) {
          try {
            const docRef = addDoc(collection(db, "users"), {
              uid: auth.currentUser.uid
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      })
      .catch((error) => {
        response = "Error: " + error;
      });

    return response;
  }

  async logout() {
    await auth.signOut()
    .then(() => {
      console.log('Logged out')
      router.push('/');
      userStore.user = null;
    })
  }
}

export default new Services();
