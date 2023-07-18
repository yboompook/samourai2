document.addEventListener("DOMContentLoaded", function() {
    getCombatants();
  });

const combatantTable = document.querySelector("table");
const combatantTableBody = document.getElementById("combatantTableBody");
const combatants = [];

// Sélection du bouton "Générer combattant"
const generateButton = document.getElementById("generateCombatants");

// Événement pour générer les combattants
generateButton.addEventListener("click", generateCombatants);

async function getCombatants() {
  try {
    const response = await fetch("/api/combatant");
    const data = await response.json();

    console.log("Données des combattants :", data); // Ajoutez cette ligne pour afficher les données des combattants dans la console

    if (Array.isArray(data.combatant)) { // Vérification si data est un tableau
      populateTable(data.combatant);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des combattants:', error);
    // Afficher un message d'erreur ou gérer l'erreur selon vos besoins
  }
}


function populateTable(combatants) {
  combatantTableBody.innerHTML = "";
  let selectedCombatants = "";
  if (combatants.length > 10)
  {
    selectedCombatants = combatants.slice(page*10, 10);
    console.log("Selected combatants:", selectedCombatants);
  }
  else
  {
    selectedCombatants = combatants;
    const plusCombatantElements = document.querySelectorAll(".pluscombatant");

    for (const element of plusCombatantElements) {
      element.style.display = "none";
    }
  }

  for (const combatant of selectedCombatants) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${combatant.nom}</td>
      <td>${combatant.vitalite}</td>
      <td>${combatant.endurance}</td>
      <td>${combatant.puissance}</td>
      <td>${combatant.dexterite}</td>
      <td>${combatant.fatigue}</td>
      <td>${combatant.niveau}</td>`

    row.addEventListener("click", function() {
      showDetails(combatant);
    });
    combatantTableBody.appendChild(row);
  }
}

function showDetails(combatant) {
  const detailWindow = document.getElementById("detailWindow");
  const combatantTable = document.getElementById("combatantTable");
  combatantTable.innerHTML = `
    <thead>
      <tr>
        <th>Nom</th>
        <th>Vitalité</th>
        <th>Endurance</th>
        <th>Puissance</th>
        <th>Dextérité</th>
        <th>Fatigue</th>
        <th>Niveau</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${combatant.nom}</td>
        <td>${combatant.vitalite}</td>
        <td>${combatant.endurance}</td>
        <td>${combatant.puissance}</td>
        <td>${combatant.dexterite}</td>
        <td>${combatant.fatigue}</td>
        <td>${combatant.niveau}</td>
      </tr>
    </tbody>
  `;
  detailWindow.style.display = "block";
}

function generateCombatants() {
  // Génération des combattants (à remplacer par votre propre logique)
  const newCombatants = [
    {
      vitalite: getRandomNumber(5, 10),
      endurance: getRandomNumber(5, 10),
      puissance: getRandomNumber(5, 10),
    },
    {
      vitalite: getRandomNumber(5, 10),
      endurance: getRandomNumber(5, 10),
      puissance: getRandomNumber(5, 10),
    },
    {
      vitalite: getRandomNumber(5, 10),
      endurance: getRandomNumber(5, 10),
      puissance: getRandomNumber(5, 10),
    },
  ];

  for (const combatant of newCombatants) {
    combatant.dexterite = 30 - (combatant.vitalite + combatant.endurance + combatant.puissance);
  }

  // Création des éléments HTML pour la modale
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.id = "combatantModal";
  modal.tabIndex = "-1";
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog", "modal-dialog-centered");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.textContent = "Combattants générés";

  const closeButton = document.createElement("button");
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  const table = document.createElement("table");
  table.classList.add("table");

  const tableHead = document.createElement("thead");
  const tableHeadRow = document.createElement("tr");
  const tableHeadColumns = ["Vitalité", "Endurance", "Puissance", "Dextérité", "Action"];
  tableHeadColumns.forEach(columnText => {
    const tableHeadColumn = document.createElement("th");
    tableHeadColumn.textContent = columnText;
    tableHeadRow.appendChild(tableHeadColumn);
  });
  tableHead.appendChild(tableHeadRow);

  const tableBody = document.createElement("tbody");
  newCombatants.forEach(combatant => {
  const tableBodyRow = document.createElement("tr");
  const tableBodyColumns = [
    combatant.vitalite,
    combatant.endurance,
    combatant.puissance,
    combatant.dexterite,
    "Recruter"
  ];
  tableBodyColumns.forEach((columnText, columnIndex) => {
    const tableBodyColumn = document.createElement("td");
    tableBodyColumn.textContent = columnText;
    tableBodyRow.appendChild(tableBodyColumn);

    if (columnIndex === tableBodyColumns.length - 1) {
      // Ajouter l'écouteur d'événement au bouton "Recruter"
      const recruitButton = document.createElement("button");
recruitButton.textContent = columnText;
recruitButton.addEventListener("click", function() {
  showRecruterModal(combatant); // Passer le combatant en tant qu'argument
  modalInstance.hide();
});
tableBodyColumn.textContent = ""; // Supprimer le texte existant
tableBodyColumn.appendChild(recruitButton);
    }
  });

  tableBody.appendChild(tableBodyRow);
});

  table.appendChild(tableHead);
  table.appendChild(tableBody);
  modalBody.appendChild(table);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);

  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  // Suppression de l'ancienne modale s'il en existe une
  const oldModal = document.getElementById("combatantModal");
  if (oldModal) {
    oldModal.remove();
  }

  // Ajout de la nouvelle modale au document
  document.body.appendChild(modal);

  // Affichage de la fenêtre modale
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}

// Fonction pour afficher la deuxième fenêtre modale de recrutement
function showRecruterModal(combatant) {
  // Création des éléments HTML pour la deuxième fenêtre modale de recrutement
  const recruterModal = document.createElement("div");
  recruterModal.classList.add("modal", "fade");
  recruterModal.id = "recruterModal";
  recruterModal.tabIndex = "-1";
  recruterModal.setAttribute("aria-hidden", "true");

  const recruterModalDialog = document.createElement("div");
  recruterModalDialog.classList.add("modal-dialog", "modal-dialog-centered", "modal-below");

  const recruterModalContent = document.createElement("div");
  recruterModalContent.classList.add("modal-content");

  const recruterModalHeader = document.createElement("div");
  recruterModalHeader.classList.add("modal-header");

  const recruterModalTitle = document.createElement("h5");
  recruterModalTitle.classList.add("modal-title");
  recruterModalTitle.textContent = "Recruter le combattant";

  const recruterModalCloseButton = document.createElement("button");
  recruterModalCloseButton.classList.add("btn-close");
  recruterModalCloseButton.setAttribute("data-bs-dismiss", "modal");
  recruterModalCloseButton.setAttribute("aria-label", "Close");

  recruterModalHeader.appendChild(recruterModalTitle);
  recruterModalHeader.appendChild(recruterModalCloseButton);

  const recruterModalBody = document.createElement("div");
  recruterModalBody.classList.add("modal-body");

  recruterModalBody.innerHTML = `
    <p>Êtes-vous sûr de vouloir recruter ce combattant ?</p>
  `;

  // Création du champ de saisie pour le nom du combattant
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Nom du combattant (3 à 10 caractères alphabétiques)");
  nameInput.classList.add("form-control");
  recruterModalBody.appendChild(nameInput);

  const confirmRecruitButton = document.createElement("button");
  confirmRecruitButton.classList.add("btn", "btn-primary");
  confirmRecruitButton.textContent = "Recruter";

  confirmRecruitButton.addEventListener("click", function() {
    const name = nameInput.value.trim();
    if (isValidName(name)) {
      combatant.nom = name;
      createCombatant(combatant);
      recruterModalInstance.hide();
      setTimeout(function() {
        getCombatants();
      }, 200);
    } else {
      alert("Le nom du combattant doit contenir entre 3 et 10 caractères alphabétiques.");
    }
  });

  recruterModalBody.appendChild(confirmRecruitButton);
  recruterModalContent.appendChild(recruterModalHeader);
  recruterModalContent.appendChild(recruterModalBody);
  recruterModalDialog.appendChild(recruterModalContent);
  recruterModal.appendChild(recruterModalDialog);
  document.body.appendChild(recruterModal);

  const recruterModalInstance = new bootstrap.Modal(recruterModal);
  recruterModalInstance.show();
}


// Fonction pour générer un nombre aléatoire entre min et max inclus
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function askForName(combatant) {
    const nameModal = document.getElementById("nameModal");
    const nameInput = document.getElementById("nameInput");
    const nameButton = document.getElementById("nameButton");
  
    nameInput.value = "";
  
    nameButton.addEventListener("click", function() {
      const name = nameInput.value.trim();
  
      if (isValidName(name)) {
        combatant.nom = name;
        createCombatant(combatant);
        nameModal.style.display = "none";
      } else {
        alert("Le nom du combattant doit contenir entre 3 et 10 caractères alphabétiques.");
      }
    });
  
    const combatantModal = document.getElementById("combatantModal");
    nameModal.style.top = combatantModal.offsetHeight + "px";
    nameModal.classList.add("modal-below");
  
    nameModal.style.display = "block";
  }
  
  function isValidName(name) {
    const regex = /^[a-zA-Z]{3,10}$/;
    return regex.test(name);
  }
  function createCombatant(combatant) {
    const { nom, vitalite, endurance, puissance, dexterite } = combatant;
  
    // Création de l'objet de données à envoyer dans la requête
    const data = {
      nom,
      vitalite,
      endurance,
      puissance,
      dexterite
    };
  
    // Configuration de la requête HTTP POST
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  
    // Envoi de la requête vers la route /combatant/add
    fetch('/combatant/add', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log("Le combattant a été créé avec succès.");
          //combatants.push(combatant); // Ajouter le combattant à la liste
          populateTable(combatants); // Mettre à jour le tableau des combattants
        } else {
          console.error("Erreur lors de la création du combattant :", response.status);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la création du combattant :", error);
      });
  }