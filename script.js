// Smooth scrolling for navigation links
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Dictionnaire des options pour les langues
const languageOptions = {
  "index-fr.html": { flag: "flags/flag_fr.svg", code: "FR" },
  "index-en.html": { flag: "flags/flag_uk.svg", code: "EN" },
  "index-es.html": { flag: "flags/flag_es.svg", code: "ES" },
};

// Fonction pour basculer l'affichage de la liste des langues
function toggleLanguageList() {
  const languageList = document.getElementById("languageList");
  languageList.classList.toggle("visible");
}

// Fonction pour changer la langue et mettre à jour la liste des options
function changeLanguage(page, flag, code) {
  // Mettre à jour l'affichage du drapeau et du code de langue
  document.getElementById("currentFlag").src = flag;
  document
    .getElementById("selectedLanguage")
    .querySelector("span").textContent = code;

  // Sauvegarder la langue sélectionnée dans le localStorage
  localStorage.setItem("languagePage", page);

  // Mettre à jour la liste des langues en masquant la langue sélectionnée
  updateLanguageList(page);

  // Fermer le menu après la sélection
  toggleLanguageList();

  // Rediriger vers la page correspondante
  window.location.href = page;
}

// Fonction pour mettre à jour la liste des langues disponibles
function updateLanguageList(selectedPage) {
  const languageList = document.getElementById("languageList");
  languageList.innerHTML = ""; // Vider la liste actuelle

  // Ajouter chaque langue sauf celle sélectionnée
  for (const [page, { flag, code }] of Object.entries(languageOptions)) {
    if (page !== selectedPage) {
      const li = document.createElement("li");
      li.onclick = () => changeLanguage(page, flag, code);
      li.innerHTML = `<img src="${flag}" alt="${code} Flag" /> ${code}`;
      languageList.appendChild(li);
    }
  }
}

// Charger la langue sauvegardée au chargement de la page pour maintenir la sélection précédente
document.addEventListener("DOMContentLoaded", () => {
  const savedPage = localStorage.getItem("languagePage") || "index-fr.html"; // FR par défaut
  const { flag, code } =
    languageOptions[savedPage] || languageOptions["index-fr.html"];

  // Mettre à jour l'affichage initial
  document.getElementById("currentFlag").src = flag;
  document
    .getElementById("selectedLanguage")
    .querySelector("span").textContent = code;

  // Mettre à jour la liste pour masquer la langue sélectionnée
  updateLanguageList(savedPage);
});
