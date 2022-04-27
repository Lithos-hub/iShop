<template>
  <nav class="navbar bg-gradient-primary">
    <div class="navbar__logo--shape"></div>
    <div class="navbar__logo">
      <h1 class="text__gradient--tertiary">iShop</h1>
    </div>
    <div class="navbar__search--input">
      <input
        v-model="inputSearch"
        type="text"
        placeholder="Search for a product"
      />
      <div class="navbar__search--icon">
        <mdicon name="magnify" size="30" />
      </div>
    </div>
    <div v-if="isUsingFullHDScreen" class="navbar__links--wrapper">
      <div v-for="link in links">
        <router-link
          class="navbar__links"
          router-link-exact-active
          :to="link.href"
          >{{ link.text }}</router-link
        >
      </div>
      <button
        class="navbar__btn cart__button"
        @click="this.$router.push('/cart')"
      >
        <div class="cart__button--badge">{{ cartStore.getCartLength }}</div>
        <mdicon name="cart" size="30" />
      </button>
      <button class="navbar__btn account__button" @click="userStore.logout()">
        <mdicon name="account-cancel" size="30" />
      </button>
    </div>
    <div v-else class="navbar__menuIcon--wrapper" @click="toggleMobileMenu">
      <mdicon name="menu" size="30" />
    </div>
  </nav>
    <nav class="navbar__expandMenu--wrapper">
      <div class="grid">
        <div class="navbar__expandMenu--closeBtn" @click="toggleMobileMenu">
          <mdicon name="close" size="30" />
        </div>
        <div class="navbar__expandMenu--title">
          <h1 class="text__gradient--tertiary">iShop</h1>
        </div>
      </div>
      <div class="d-flex absolute__centered">
        <div v-for="link in links">
          <router-link
            class="navbar__links"
            router-link-exact-active
            :to="link.href"
            >{{ link.text }}</router-link
          >
        </div>
        <button
          class="navbar__btn cart__button"
          @click="this.$router.push('/cart')"
        >
          <div class="cart__button--badge">{{ cartStore.getCartLength }}</div>
          <mdicon name="cart" size="30" />
        </button>
        <button class="navbar__btn account__button" @click="userStore.logout()">
          <mdicon name="account-cancel" size="30" />
        </button>
      </div>
    </nav>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { listenScroll } from "../utils/scrollFX";
import { useCartStore } from "../stores/cart";
import { useUserStore } from "../stores/user";
import { computed } from "@vue/reactivity";

const cartStore = useCartStore();
const userStore = useUserStore();

const links = [
  { text: "Home", href: "/home" },
  { text: "Shop", href: "/shop" },
  { text: "About", href: "/about" },
];

let screenWidth = ref(window.innerWidth);
let isUsingFullHDScreen = computed(() => screenWidth.value > 1500);

const toggleMobileMenu = () => {
  const menu = document.querySelector(".navbar__expandMenu--wrapper");
  menu.classList.toggle("expanded__menu");
};

onMounted(() => {
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
  box-shadow: 0px 2px 5px black, 0px 5px 10px #101010;
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
    height: 45px;
    border-radius: 5px 0px 0px 5px;
    border: none;
    padding-left: 10px;

    &:focus {
      outline: none;
    }
  }
}

.navbar__search--icon {
  cursor: pointer;
  height: 29px;
  background: #202020;
  padding-inline: 10px;
  padding-block: 10px;
  border-radius: 0px 5px 5px 0px;
  color: white;

  &:hover {
    color: $textPrimary;
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
  background: #303030;
  color: #ffffff;
  padding: 10px;
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
  width: 50px;
  height: 50px;
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
  font-size: 1em;
  font-weight: bold;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 2px;
  position: absolute;
  right: 0;
  top: -5px;
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
  height: 180px;
  opacity: 0;
  background: $gradientPrimary;

  h1 {
    font-size: 2em;
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
