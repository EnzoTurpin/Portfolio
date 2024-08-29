// Smooth scrolling for navigation links
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function toggleLanguageList() {
  const languageList = document.getElementById("languageList");
  languageList.classList.toggle("visible");
}

function changeLanguage(page, flag, code) {
  // Mettre à jour l'affichage du drapeau et du code de langue
  document.getElementById("currentFlag").src = flag;
  document
    .getElementById("selectedLanguage")
    .querySelector("span").textContent = code;

  // Sauvegarder la langue sélectionnée dans le localStorage
  localStorage.setItem("languagePage", page);

  // Fermer le menu après la sélection
  toggleLanguageList();

  // Rediriger vers la page correspondante
  window.location.href = page;
}

// Optionnel : Charger la langue sauvegardée au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const savedPage = localStorage.getItem("languagePage");
  if (savedPage) {
    const options = {
      "index-fr.html": { flag: "flags/flag_fr.svg", code: "FR" },
      "index-en.html": { flag: "flags/flag_uk.svg", code: "EN" },
      "index-es.html": { flag: "flags/flag_es.svg", code: "ES" },
    };
    if (options[savedPage]) {
      document.getElementById("currentFlag").src = options[savedPage].flag;
      document
        .getElementById("selectedLanguage")
        .querySelector("span").textContent = options[savedPage].code;
    }
  }
});
