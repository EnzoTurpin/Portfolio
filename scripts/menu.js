function toggleMenu() {
  const nav = document.querySelector("nav ul");
  const toggle = document.querySelector(".menu-toggle");
  const body = document.body;

  nav.classList.toggle("show");
  toggle.classList.toggle("active");

  // Ajouter ou retirer la classe 'no-scroll' sur le body
  if (nav.classList.contains("show")) {
    body.classList.add("no-scroll");
  } else {
    body.classList.remove("no-scroll");
  }
}

// Fermer le menu lorsqu'un lien est cliqué
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.querySelector("nav ul");
    const toggle = document.querySelector(".menu-toggle");
    const body = document.body;

    nav.classList.remove("show");
    toggle.classList.remove("active");

    // Retirer la classe 'no-scroll' sur le body lorsque le menu est fermé
    body.classList.remove("no-scroll");
  });
});
