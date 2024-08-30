let translations = {};

document.addEventListener("DOMContentLoaded", () => {
  fetch("translations.json")
    .then((response) => response.json())
    .then((data) => {
      translations = data;
      const savedLang = localStorage.getItem("language") || "fr";
      setLanguage(savedLang);
    });
});

function setLanguage(lang) {
  localStorage.setItem("language", lang);
  document.getElementById("currentFlag").src = `flags/flag_${lang}.svg`;
  document
    .getElementById("selectedLanguage")
    .querySelector("span").textContent = lang.toUpperCase();

  // Met à jour la liste des langues pour exclure celle qui est actuellement sélectionnée
  updateLanguageList(lang);

  document.querySelectorAll(".translate").forEach((element) => {
    const key = element.getAttribute("data-key");
    const text = getNestedTranslation(translations, lang, key);
    if (text) element.textContent = text;
  });
}

function getNestedTranslation(translations, lang, key) {
  return key
    .split(".")
    .reduce((obj, keyPart) => obj?.[keyPart], translations[lang]);
}

function changeLanguage(lang) {
  setLanguage(lang);
  toggleLanguageList();
}

function toggleLanguageList() {
  const languageList = document.getElementById("languageList");
  languageList.classList.toggle("visible");
}

// Met à jour la liste des langues disponibles dans le menu
function updateLanguageList(selectedLang) {
  const languages = {
    fr: { flag: "flags/flag_fr.svg", code: "FR" },
    en: { flag: "flags/flag_en.svg", code: "EN" },
    es: { flag: "flags/flag_es.svg", code: "ES" },
  };

  const languageList = document.getElementById("languageList");
  languageList.innerHTML = ""; // Réinitialise la liste

  // Parcours toutes les langues et ajoute celles qui ne sont pas sélectionnées
  for (const [lang, { flag, code }] of Object.entries(languages)) {
    if (lang !== selectedLang) {
      const li = document.createElement("li");
      li.onclick = () => changeLanguage(lang);
      li.innerHTML = `<img src="${flag}" alt="${code} Flag" /> ${code}`;
      languageList.appendChild(li);
    }
  }
}

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
