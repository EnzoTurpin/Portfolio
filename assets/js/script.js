"use strict";

// Fonction de basculement d'élément
const fonctionToggleElement = function (elem) {
  elem.classList.toggle("active");
};

// Variables de la barre latérale
const barreLaterale = document.querySelector("[data-sidebar]");
const boutonBarreLaterale = document.querySelector("[data-sidebar-btn]");

// Fonctionnalité de basculement de la barre latérale pour les appareils mobiles
boutonBarreLaterale.addEventListener("click", function () {
  fonctionToggleElement(barreLaterale);
});

// Variables des témoignages
const elementsTemoignages = document.querySelectorAll(
  "[data-testimonials-item]"
);
const conteneurModal = document.querySelector("[data-modal-container]");
const boutonFermerModal = document.querySelector("[data-modal-close-btn]");
const superposition = document.querySelector("[data-overlay]");

// Variable de la modal
const imageModal = document.querySelector("[data-modal-img]");
const titreModal = document.querySelector("[data-modal-title]");
const texteModal = document.querySelector("[data-modal-text]");

// Fonction de basculement de la modal
const fonctionModalTemoignages = function () {
  conteneurModal.classList.toggle("active");
  superposition.classList.toggle("active");
};

// Ajouter un événement de clic à tous les éléments de la modal
for (let i = 0; i < elementsTemoignages.length; i++) {
  elementsTemoignages[i].addEventListener("click", function () {
    imageModal.src = this.querySelector("[data-testimonials-avatar]").src;
    imageModal.alt = this.querySelector("[data-testimonials-avatar]").alt;
    titreModal.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    texteModal.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    fonctionModalTemoignages();
  });
}

// Ajouter un événement de clic au bouton de fermeture de la modal
boutonFermerModal.addEventListener("click", fonctionModalTemoignages);
superposition.addEventListener("click", fonctionModalTemoignages);

// Variables du sélecteur personnalisé
const selecteur = document.querySelector("[data-select]");
const elementsSelecteur = document.querySelectorAll("[data-select-item]");
const valeurSelecteur = document.querySelector("[data-selecct-value]");
const boutonsFiltre = document.querySelectorAll("[data-filter-btn]");

selecteur.addEventListener("click", function () {
  fonctionToggleElement(this);
});

// Ajouter un événement à tous les éléments du sélecteur
for (let i = 0; i < elementsSelecteur.length; i++) {
  elementsSelecteur[i].addEventListener("click", function () {
    let valeurSelectionnee = this.innerText.toLowerCase();
    valeurSelecteur.innerText = this.innerText;
    fonctionToggleElement(selecteur);
    fonctionFiltre(valeurSelectionnee);
  });
}

// Variables de filtre
const elementsFiltre = document.querySelectorAll("[data-filter-item]");

const fonctionFiltre = function (valeurSelectionnee) {
  for (let i = 0; i < elementsFiltre.length; i++) {
    if (valeurSelectionnee === "tout") {
      elementsFiltre[i].classList.add("active");
    } else if (valeurSelectionnee === elementsFiltre[i].dataset.category) {
      elementsFiltre[i].classList.add("active");
    } else {
      elementsFiltre[i].classList.remove("active");
    }
  }
};

// Ajouter un événement à tous les boutons de filtre pour les grands écrans
let dernierBoutonClique = boutonsFiltre[0];

for (let i = 0; i < boutonsFiltre.length; i++) {
  boutonsFiltre[i].addEventListener("click", function () {
    let valeurSelectionnee = this.innerText.toLowerCase();
    valeurSelecteur.innerText = this.innerText;
    fonctionFiltre(valeurSelectionnee);

    dernierBoutonClique.classList.remove("active");
    this.classList.add("active");
    dernierBoutonClique = this;
  });
}

// Variables du formulaire de contact
const formulaire = document.querySelector("[data-form]");
const champsFormulaire = document.querySelectorAll("[data-form-input]");
const boutonFormulaire = document.querySelector("[data-form-btn]");

// Ajouter un événement à tous les champs de saisie du formulaire
for (let i = 0; i < champsFormulaire.length; i++) {
  champsFormulaire[i].addEventListener("input", function () {
    // Vérifier la validation du formulaire
    if (formulaire.checkValidity()) {
      boutonFormulaire.removeAttribute("disabled");
    } else {
      boutonFormulaire.setAttribute("disabled", "");
    }
  });
}

// Variables de navigation de page
const liensNavigation = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Ajouter un événement à tous les liens de navigation
for (let i = 0; i < liensNavigation.length; i++) {
  liensNavigation[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        liensNavigation[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        liensNavigation[i].classList.remove("active");
      }
    }
  });
}

// Application du mode clair...
const boutonBasculerMode = document.getElementById("mode-toggle-btn");
const boutonMode = document.getElementById("mood-btn");
const iconeMode = document.getElementById("mood-icon");
const cleModeClair = "light-mode";

const mettreAJourModeClair = (active) => {
  // 1. Bascule de la classe sur le body
  document.body.classList.toggle("light-mode", active);
  boutonMode.classList.toggle("light-mode", active);
  iconeMode.src = active ? "assets/images/moon.svg" : "assets/images/sun.svg";

  // 2. Mettre à jour lightMode dans localStorage
  localStorage.setItem(cleModeClair, active ? "enabled" : null);
};

// Initialiser le mode clair en fonction du localStorage
mettreAJourModeClair(localStorage.getItem(cleModeClair) === "enabled");

// Bascule du mode clair lorsque le bouton est cliqué
boutonBasculerMode.addEventListener("click", () => {
  // Bascule du paramètre lightMode actuel
  mettreAJourModeClair(localStorage.getItem(cleModeClair) !== "enabled");
  console.log(localStorage.getItem(cleModeClair) + " activé");
});
