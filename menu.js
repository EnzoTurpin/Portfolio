document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("hamburger-menu")
    .addEventListener("click", function () {
      console.log("Hamburger menu clicked!");
      const navLinks = document.getElementById("nav-links");
      navLinks.classList.toggle("open");
    });
});
