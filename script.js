// Smooth scrolling for navigation links
document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

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
