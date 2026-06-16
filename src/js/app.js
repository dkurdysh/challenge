console.log("init new challenges app");

const navToggle = document.querySelector('[data-element~="navToggle"]');
const body = document.body;

const toggleNav = () => {
  body.classList.toggle("is-nav-open");
};

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}