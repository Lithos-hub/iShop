window.onscroll = () => listenScroll();

export const listenScroll = () => {
  const navbar = document.querySelector("nav");
  const logo = document.querySelector(".navbar__logo");
  const links = document.querySelector(".navbar__links--wrapper");
  const categoriesMenu = document.querySelector("#shop__categoriesMenu");
  const expandedMenu = document.querySelector(".navbar__expandMenu--wrapper");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    navbar.style.height = "50px";
    navbar.style.paddingBlock = "5px";
    navbar.style.paddingInline = "10px";
    expandedMenu.style.height="50px";
    expandedMenu.style.paddingBlock = "5px";
    expandedMenu.style.paddingInline = "10px";
    logo.style.fontSize = "1em";
    logo.style.top = "-1vh"
    logo.style.left = "-2vw"
    links.style.right = "2vh";
    categoriesMenu.style.background = "#202020";
    categoriesMenu.style.boxShadow = "0px 2px 5px black, 0px 5px 10px #101010";
    
  } else {
    navbar.style.height = "120px";
    navbar.style.paddingBlock = "30px";
    navbar.style.paddingInline = "20px";
    expandedMenu.style.height = "120px";
    expandedMenu.style.paddingBlock = "30px";
    expandedMenu.style.paddingInline = "20px";
    logo.style.fontSize = "2rem";
    logo.style.top = "-1vh"
    logo.style.left = "0vw"
    categoriesMenu.style.background = "transparent";
    categoriesMenu.style.boxShadow = "none";
  }
}
