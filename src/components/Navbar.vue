<template>
  <nav class="navbar bg-gradient-primary">
    <div class="navbar__logo--shape"></div>
    <div class="navbar__logo">
      <h1>iShop</h1>
    </div>
    <div class="navbar__search--input">
      <input
        v-model="inputSearch"
        type="text"
        placeholder="Search for a product"
        @change="searchProduct"
      />
      <button class="navbar__search--icon button__special" @click="searchProduct">
        <mdicon
          id="search__icon"
          name="magnify"
          :size="isUsingFullHDScreen ? 23 : 20"
        />
      </button>
    </div>
    <div v-show="isUsingFullHDScreen" class="navbar__links--wrapper">
      <div v-for="link in links">
        <router-link
          class="navbar__links reflections"
          router-link-exact-active
          :to="link.href"
          >{{ link.text }}</router-link
        >
      </div>
      <button
        id="cart__button--contracted"
        class="navbar__btn cart__button"
        @click="router.push('/cart')"
      >
        <div class="cart__button--badge">{{ cartStore.getCartLength }}</div>
        <mdicon name="cart" :size="isUsingFullHDScreen ? 23 : 20" />
      </button>
      <button class="navbar__btn account__button" @click="userStore.logout()">
        <mdicon name="account-cancel" :size="isUsingFullHDScreen ? 23 : 20" />
      </button>
    </div>
    <div v-show="!isUsingFullHDScreen" class="navbar__menuIcon--wrapper" @click="toggleMobileMenu">
      <mdicon name="menu" :size="isUsingFullHDScreen ? 23 : 20" />
    </div>
  </nav>
  <nav class="navbar__expandMenu--wrapper">
    <div class="grid">
      <div class="navbar__expandMenu--closeBtn" @click="toggleMobileMenu">
        <mdicon name="close" :size="isUsingFullHDScreen ? 23 : 20" />
      </div>
      <div class="navbar__expandMenu--title">
        <h1 class="white--text">iShop</h1>
      </div>
    </div>
    <div class="d-flex center absolute__centered">
      <div v-for="link in links">
        <router-link
          class="navbar__links reflections"
          router-link-exact-active
          :to="link.href"
          >{{ link.text }}</router-link
        >
      </div>
      <button
        id="cartButton__expanded"
        class="navbar__btn cart__button"
        @click="router.push('/cart')"
      >
        <div class="cart__button--badge">{{ cartStore.getCartLength }}</div>
        <mdicon name="cart" :size="isUsingFullHDScreen ? 23 : 20" />
      </button>
      <button class="navbar__btn account__button" @click="userStore.logout()">
        <mdicon name="account-cancel" :size="isUsingFullHDScreen ? 23 : 20" />
      </button>
    </div>
  </nav>
  <FloatCart
    v-if="showingFloatCart"
    @mouseleave="showingFloatCart = false"
    @close="showingFloatCart = false"
    :client-y="clientY"
    :client-x="clientX"
  />
</template>

<script setup>
// VUEX & UTILS
import { useCartStore } from "../stores/Cart";
import { useUserStore } from "../stores/User";
import { useProductStore } from "../stores/Product";
import { onMounted, ref, computed } from "vue";
import { listenScroll } from "../utils/scrollFX";
import { useRoute, useRouter } from "vue-router";

// COMPONENTS
import FloatCart from "./FloatCart.vue";

const cartStore = useCartStore();
const userStore = useUserStore();
const productStore = useProductStore();
const router = useRouter();
const route = useRoute();
let clientY = ref(0);
let clientX = ref(0);
let showingFloatCart = ref(false);

const getClientCoords = () => {
  const cartButtonContracted = document.querySelector(
    "#cart__button--contracted"
  );
  const cartButtonExpanded = document.querySelector("#cartButton__expanded");
  if (cartButtonContracted) {
    cartButtonContracted.addEventListener("mouseover", (e) => {
      clientY.value = e.clientY + 10;
      clientX.value = e.clientX - 300;

      setTimeout(() => {
        showingFloatCart.value = true;
      }, 250);
    });
  }
  if (cartButtonExpanded) {
    cartButtonExpanded.addEventListener("mouseover", (e) => {
      clientY.value = e.clientY + 10;
      clientX.value = e.clientX - 50;

      setTimeout(() => {
        showingFloatCart.value = true;
      }, 250);
    });
  }
};

const links = [
  { text: "Home", href: "/home" },
  { text: "Shop", href: "/shop" },
  { text: "About", href: "/about" },
];

let screenWidth = ref(window.innerWidth);
let isUsingFullHDScreen = computed(() => screenWidth.value > 1500);
let inputSearch = ref("");
const toggleMobileMenu = () => {
  const menu = document.querySelector(".navbar__expandMenu--wrapper");
  menu.classList.toggle("expanded__menu");
};

const searchProduct = () => {
  productStore.searchQuery = inputSearch.value;
  if (route.path !== "/shop") {
    router.push("/shop");
  }
};

onMounted(() => {
  getClientCoords();
  listenScroll();
  window.addEventListener(
    "resize",
    () => (screenWidth.value = window.innerWidth)
  );
});
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/app.scss";

* {
  transition: all 0.3s ease-out;
}

nav {
  position: sticky;
  z-index: 9999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 10px #40404084;
}

.navbar__logo--shape {
  background: radial-gradient(at top left, #3f52ff, #af36ff);
  position: absolute;
  top: 0;
  left: 0;
  width: 350px;
  height: 100%;
  clip-path: polygon(0 0, 100% 0%, 50% 100%, 0% 100%);
}

.navbar__logo {
  position: relative;
  width: 200px;
  color: white;
  text-align: center;

  h1 {
    position: absolute;
    top: 0%;
    transform: translateY(-20%);
    letter-spacing: 3px;
    width: 100%;
    font-weight: bold;
    font-family: "Lato", sans-serif;
  }
}

.navbar__search--input {
  position: absolute;
  left: clamp(30%, 50%, 48%);
  top: 50%;
  transform: translate(-50%, -50%);
  margin-block: auto;
  display: flex;
  width: clamp(250px, 50%, 700px);

  input {
    width: 100%;
    height: clamp(25px, 35px, 45px);
    border-radius: 25px 0px 0px 25px;
    border: none;
    padding-left: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.435);

    &:focus {
      outline: none;
    }
  }
}

.navbar__search--icon {
  position: relative;
  width: 50px;
  border: none;
  height: 37px;
  margin-right: 20px;
  cursor: pointer;
  height: clamp(15px, 40px, 37px);
  background: $gradientPrimary;
  padding-block: clamp(5px, 10px, 3.8px);
  border-radius: 0px 25px 25px 0px;
  color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.435);

  #search__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.navbar__links--wrapper {
  position: absolute;
  right: 2vw;
  top: 50%;
  transform: translate(0%, -50%);
  display: flex;
  align-items: center;
  width: clamp(250px, 50%, 410px);
}

.navbar__links {
  color: #ffffff;
  padding: clamp(5px, 7.5px, 10px);
  padding-inline: 1.2rem;
  border-radius: 20px;
  text-decoration: none;
  margin-inline: 5px;
}

.exact-active,
.active {
  background: white;
  color: #151515;
}

.navbar__btn {
  cursor: pointer;
  border: none;
  position: relative;
  color: white;
  border-radius: 50%;
  width: clamp(35px, 30px, 30px);
  height: clamp(35px, 30px, 30px);
  margin-left: 20px;
}

.cart__button {
  background: $textPrimary;

  &:hover {
    background: rgb(47, 62, 201);
    .cart__button--badge {
      color: white;
    }
  }
}

.cart__button--badge {
  background: rgb(201, 47, 47);
  font-size: clamp(10px, 12px, 12px);
  font-weight: bold;
  border-radius: 50%;
  width: clamp(20px, 30px, 15px);
  height: clamp(20px, 30px, 15px);
  padding: 2px;
  position: absolute;
  right: clamp(-5px, -10px, -10px);
  top: clamp(0px, 0px, 10px);
}

.account__button {
  background: $textDanger;

  &:hover {
    background: rgb(201, 47, 47);
  }
}

.navbar__menuIcon--wrapper {
  cursor: pointer;
  position: absolute;
  right: 5vw;
  top: 50%;
  transform: translate(0%, -50%);
  color: white;
}

.navbar__expandMenu--wrapper {
  position: fixed;
  top: 0;
  right: -50vw;
  width: 0%;
  height: 120px;
  opacity: 0;
  background: $gradientPrimary;

  h1 {
    font-size: clamp(25px, 32px, 38px);
    top: 0vh;
  }
}

.navbar__expandMenu--title {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(0%, -50%);
}

.expanded__menu {
  transition: 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: 100%;
  left: 0vw;
  right: 0vw;
  opacity: 1;
  height: 180px;
}

.navbar__expandMenu--closeBtn {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 2vh;
  transform: translate(0%, -50%);
  color: white;
  margin-block: auto;
  text-align: center;
}
</style>
