// Afficher le bouton lorsque l'utilisateur fait défiler vers le bas de 100px
window.onscroll = function () {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTopBtn.style.display = "flex"; // Utilise flex pour centrer le contenu
  } else {
    scrollToTopBtn.style.display = "none";
  }
};

// Remonter en haut de la page lorsqu'on clique sur le bouton
document
  .getElementById("scrollToTopBtn")
  .addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
