// Récupération des éléments DOM
const documentPage = document.getElementById("document");
const suiviCaPage = document.getElementById("suiviCa");

const documentBtn = document.getElementById("documentBtn");
const periodeBtn = document.getElementById("periodeBtn");
const documentSection = document.getElementById("documentSection");
const periodeSection = document.getElementById("periodeSection");

const openFilterButton = document.querySelector(".filterBtn");
const popupContainer = document.querySelector(".popupContainer");
const dropdownIcon = document.getElementById("dropdownIcon");
const selectedDocument = document.getElementById("selectedDocument");
const dropdownOptions = document.getElementById("dropdownOptions");

const periodeLabel = document.querySelector(".periodeLabel");
const periodeDropdownIcon = document.querySelector(".periodeDropdownIcon");
const periodeOptions = document.querySelector(".periodeOptions");
const moisField = document.querySelector(".moisField");
const anneeField = document.querySelector(".anneeField");
const periodePersonnaliseeField = document.querySelector(
  ".periodePersonnaliseeField"
);

const resetBtn = document.getElementById("resetBtn");
const cancelBtn = document.getElementById("cancelBtn");
const validateBtn = document.getElementById("validateBtn");

const statusPending = document.getElementById("statusPending");
const statusValidate = document.getElementById("statusValidate");
const statusRefused = document.getElementById("statusRefused");
const selectAllCheckbox = document.getElementById("selectAll");
const checkboxes = document.querySelectorAll(".checkbox");

// Gestion des pages
function switchPage(activePage, inactivePage, targetUrl) {
  if (activePage && inactivePage) {
    activePage.classList.add("active");
    inactivePage.classList.remove("active");
    window.location.href = targetUrl;
  }
}
if (documentPage && suiviCaPage) {
  documentPage.addEventListener("click", () =>
    switchPage(documentPage, suiviCaPage, "documents.html")
  );
  suiviCaPage.addEventListener("click", () =>
    switchPage(suiviCaPage, documentPage, "suiviCA.html")
  );
}

// Activation de la section Documents
documentBtn.addEventListener("click", function () {
  documentSection.classList.add("activeSection");
  documentSection.classList.remove("hidden");
  periodeSection.classList.add("hidden");
  documentBtn.classList.add("active");
  periodeBtn.classList.remove("active");
});

// Activation de la section Période
periodeBtn.addEventListener("click", function () {
  periodeSection.classList.add("activeSection");
  periodeSection.classList.remove("hidden");
  documentSection.classList.add("hidden");
  documentBtn.classList.remove("active");
  periodeBtn.classList.add("active");
});

// Gestion de la popup (bouton filtre)
function togglePopupVisibility() {
  if (popupContainer) {
    popupContainer.classList.toggle("hidden");
  }
}
if (openFilterButton && popupContainer) {
  openFilterButton.addEventListener("click", togglePopupVisibility);
  popupContainer.addEventListener("click", (event) => {
    if (event.target === popupContainer) {
      popupContainer.classList.add("hidden");
    }
  });
}

// Gestion du dropdown pour la sélection des documents
function updateSelectedDocument(item) {
  if (selectedDocument && item) {
    selectedDocument.textContent = item.textContent;
    dropdownOptions.classList.remove("show");
  }
}
if (dropdownIcon && dropdownOptions && selectedDocument) {
  dropdownIcon.addEventListener("click", () =>
    dropdownOptions.classList.toggle("show")
  );
  const documentItems = document.querySelectorAll(".dropdownOption");
  documentItems.forEach((item) => {
    item.addEventListener("click", () => updateSelectedDocument(item));
  });
}
// Réinitialiser un document sélectionné
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    selectedDocument.textContent = "Pièce d’identité";
  });
}

// Validation et fermeture de la popup
if (cancelBtn && validateBtn) {
  cancelBtn.addEventListener("click", togglePopupVisibility);
  validateBtn.addEventListener("click", () => {
    console.log("Document sélectionné :", selectedDocument.textContent);
    togglePopupVisibility();
  });
}

// Gestion de la sélection de la période
function handlePeriodeSelection() {
  periodeDropdownIcon.addEventListener("click", () =>
    periodeOptions.classList.toggle("show")
  );
  periodeOptions.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const selectedValue = e.target.getAttribute("data-value");
      periodeLabel.textContent = e.target.textContent;
      moisField.classList.add("hidden");
      anneeField.classList.add("hidden");
      periodePersonnaliseeField.classList.add("hidden");

      if (selectedValue === "mois") moisField.classList.remove("hidden");
      else if (selectedValue === "annee") anneeField.classList.remove("hidden");
      else if (selectedValue === "periode-personnalisee")
        periodePersonnaliseeField.classList.remove("hidden");
      periodeOptions.classList.remove("show");
    }
  });
}
if (periodeLabel && periodeOptions && periodeDropdownIcon) {
  handlePeriodeSelection();
  console.log("clique marche");
}

// Gestion des statuts
function updateStatus(activeStatus) {
  [statusPending, statusValidate, statusRefused].forEach((status) =>
    status?.classList.remove("active")
  );
  activeStatus?.classList.add("active");
}
if (statusPending && statusValidate && statusRefused) {
  statusPending.addEventListener("click", () => updateStatus(statusPending));
  statusValidate.addEventListener("click", () => updateStatus(statusValidate));
  statusRefused.addEventListener("click", () => updateStatus(statusRefused));
}

// Gestion des checkboxs
function areAllCheckboxesChecked() {
  return Array.from(checkboxes).every((checkbox) => checkbox.checked);
}
if (selectAllCheckbox && checkboxes.length > 0) {
  selectAllCheckbox.addEventListener("change", function () {
    checkboxes.forEach((checkbox) => (checkbox.checked = this.checked));
  });
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      selectAllCheckbox.checked = areAllCheckboxesChecked();
    });
  });
}
