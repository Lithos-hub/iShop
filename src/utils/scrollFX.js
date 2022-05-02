
export const listenScroll = () => {
  document.documentElement.style.scrollBehavior = "smooth";
  const navbar = document.querySelector("nav");
  const logo = document.querySelector(".navbar__logo");
  const links = document.querySelector(".navbar__links--wrapper");
  const categoriesMenu = document.querySelector("#shop__categoriesMenu");
  const expandedMenu = document.querySelector(".navbar__expandMenu--wrapper");
  if (document.documentElement.scrollTop > 150 || document.body.scrollTop > 150) {
    navbar.style.height = "48px";
    navbar.style.paddingBlock = window.innerWidth < 1920 ? "0px" : "5px";
    navbar.style.paddingInline = "10px";
    expandedMenu.style.height = "48px";
    expandedMenu.style.paddingBlock = window.innerWidth < 1920 ? "0px" : "5px";
    expandedMenu.style.paddingInline = "10px";
    logo.style.fontSize = window.innerWidth < 1920 ? "18px" : "1em";
    logo.style.top = window.innerWidth < 1920 ? "-2vh" : "-1vh"
    logo.style.left = "-2vw";
    if (links) {
      links.style.right = "2vh";
    }
    if (categoriesMenu) {
      categoriesMenu.style.top = window.innerWidth < 1920 ? "7.5vh" : "5.5vh";
      categoriesMenu.style.background = "linear-gradient(120deg, #4cbaff, #6764ff, #9d00ff, #a04cff)";
      categoriesMenu.style.boxShadow = "0px 0px 10px #404040";
    }
  } else {
    navbar.style.height = window.innerWidth < 1920 ? "60px" : "120px";
    navbar.style.paddingBlock = window.innerWidth < 1920 ? "15px" : "30px";
    navbar.style.paddingInline = "20px";
    expandedMenu.style.height = window.innerWidth < 1920 ? "60px" : "120px";
    expandedMenu.style.paddingBlock = window.innerWidth < 1920 ? "15px" : "30px";
    expandedMenu.style.paddingInline = "20px";
    logo.style.fontSize = window.innerWidth < 1920 ? "1.5rem" : "2rem";
    logo.style.top = window.innerWidth < 1920 ? "-3vh" : "-1vh"
    logo.style.left = window.innerWidth < 1920 ? "-2vw" : "0vw"
    if (categoriesMenu) {
      categoriesMenu.style.background = "transparent";
      categoriesMenu.style.boxShadow = "none";
    }
  }
}