window.onscroll = () => listenScroll();

export const listenScroll = () => {
  const navbar = document.querySelector("nav");
  const header = document.querySelector("#navbarMenu__header");
  const logo = document.querySelector(".navbar__logo");
  const links = document.querySelector(".navbar__links--wrapper");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    navbar.style.height = "50px";
    navbar.style.paddingBlock = "5px";
    navbar.style.paddingInline = "10px";
    logo.style.fontSize = "1em";
    logo.style.top = "-1vh"
    logo.style.left = "-2vw"
    links.style.right = "2vh";
    header.opacity = 0;
    header.top = "-5vh";

  } else {
    navbar.style.height = "120px";
    navbar.style.paddingBlock = "30px";
    navbar.style.paddingInline = "20px";
    logo.style.fontSize = "2rem";
    logo.style.top = "-1vh"
    logo.style.left = "0vw"
    header.opacity = 1;
    header.top = "5vh";
  }
}
