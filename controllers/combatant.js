
let combatants = [];

document.addEventListener("DOMContentLoaded", async function() {
    await getCombatants();

    let selectedCombatant = combatants[0];
    console.log(selectedCombatant)
    if (combatants.length > 0)
    {
      fillDetailWindow(selectedCombatant);
    }
    console.log(combatants)
  });

const combatantTable = document.querySelector("table");
const combatantTableBody = document.getElementById("combatantTableBody");

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
      combatants = data.combatant;
      displayCurrentPage(combatants);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des combattants:', error);
    // Afficher un message d'erreur ou gérer l'erreur selon vos besoins
  }
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

  nameInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) { // 13 correspond au code de la touche "Entrée"
      confirmRecruitButton.click(); // Simuler le clic sur le bouton "Recruter"
    }
  });

  confirmRecruitButton.addEventListener("click", function() {
    const name = nameInput.value.trim();
    if (isValidName(name)) {
      combatant.nom = name;
      createCombatant(combatant);
      recruterModalInstance.hide();
      setTimeout(function() {
        getCombatants();
      }, 100);
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
  
  setTimeout(function() {
    nameInput.select();
    nameInput.focus();
  }, 500);

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
          displayCurrentPage(combatants); // Mettre à jour le tableau des combattants
        } else {
          console.error("Erreur lors de la création du combattant :", response.status);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la création du combattant :", error);
      });
  }

  function updateCombatant(combatant) {
    // Création de l'objet de données à envoyer dans la requête
    const data = {
      nom: combatant.nom,
      vitalite: combatant.vitalite,
      endurance: combatant.endurance,
      puissance: combatant.puissance,
      dexterite: combatant.dexterite,
      niveau: combatant.niveau,
      fatigue: combatant.fatigue,
    };
  
    // Configuration de la requête HTTP PUT
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    // Envoi de la requête vers la route /combatant/update avec l'ID du combattant à mettre à jour
    fetch(`/combatant/update/${combatant.Id_combatant}`, requestOptions)
      .then(response => {
        if (response.ok) {
          console.log("Le combattant a été mis à jour avec succès.");
          getCombatants();
          setTimeout(function() {
            displayCurrentPage(combatants)
          }, 100);
        } else {
          console.error("Erreur lors de la mise à jour du combattant :", response.status);
        }
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour du combattant :", error);
      });
  }


const plusVitaliteButton = document.getElementById("plusvitalite");
const plusEnduranceButton = document.getElementById("plusendurance");
const plusPuissanceButton = document.getElementById("pluspuissance");
const plusDexteriteButton = document.getElementById("plusdexterite");

let selectedCombatant;

// Ajouter les écouteurs d'événements pour les boutons +
plusVitaliteButton.addEventListener("click", function() {
  increaseAttribute("vitalite");
});

plusEnduranceButton.addEventListener("click", function() {
  increaseAttribute("endurance");
});

plusPuissanceButton.addEventListener("click", function() {
  increaseAttribute("puissance");
});

plusDexteriteButton.addEventListener("click", function() {
  increaseAttribute("dexterite");
});
// Fonction pour augmenter l'attribut du combattant sélectionné
function increaseAttribute(attribute) {
  if (selectedCombatant) {
    // Vérifier quel attribut est sélectionné et l'incrémenter
    switch (attribute) {
      case "vitalite":
        selectedCombatant.vitalite++;
        break;
      case "endurance":
        selectedCombatant.endurance++;
        break;
      case "puissance":
        selectedCombatant.puissance++;
        break;
      case "dexterite":
        selectedCombatant.dexterite++;
        break;
      default:
        break;
    }
    
    // Mettre à jour le combattant dans la base de données et la fenêtre modale de détail
    updateCombatant(selectedCombatant);
    fillDetailWindow(selectedCombatant);
  }
}

  function fillDetailWindow(combatant) {
    if (combatant.fatigue >=100)
    {
      combattreButton.disabled = true;
    }
    else
    {
      combattreButton.disabled = false;
    }
    selectedCombatant = combatant;
    const detailWindow = document.getElementById("detailWindow"); // Ajout de la déclaration de detailWindow
    // Fixer la largeur de la fenêtre modale de détail en fonction de la largeur de tableContainer
    //const tableWidth = tableContainer.offsetWidth;
    //detailWindow.style.width = tableWidth + "px";
    const tableWidth = combatantTable.clientWidth;
    detailWindow.style.width = tableWidth + "px";
  
    // Remplir les détails du combattant dans les éléments HTML appropriés
    const nameElement = detailWindow.querySelector(".name");
    const fatigueElement = detailWindow.querySelector(".fatigue");
    const niveauElement = detailWindow.querySelector(".niveau");
    const vitaliteElement = detailWindow.querySelector(".vitalite");
    const enduranceElement = detailWindow.querySelector(".endurance");
    const puissanceElement = detailWindow.querySelector(".puissance");
    const dexteriteElement = detailWindow.querySelector(".dexterite");
  
    nameElement.textContent = combatant.nom;
    fatigueElement.textContent = "Fatigue: " + combatant.fatigue;
    niveauElement.textContent = "Niveau: " + combatant.niveau;
    vitaliteElement.textContent = "vitalite: " + combatant.vitalite;
    enduranceElement.textContent = "endurance: " + combatant.endurance;
    puissanceElement.textContent = "puissance: " + combatant.puissance;
    dexteriteElement.textContent = "dexterite: " + combatant.dexterite;

    if (((30 - (combatant.vitalite + combatant.endurance + combatant.puissance + combatant.dexterite)) + combatant.niveau *5) > 0)
    {
      plusVitaliteButton.disabled = false;
      plusEnduranceButton.disabled = false;
      plusPuissanceButton.disabled = false;
      plusDexteriteButton.disabled = false;
    }
    else
    {
      plusVitaliteButton.disabled = true;
      plusEnduranceButton.disabled = true;
      plusPuissanceButton.disabled = true;
      plusDexteriteButton.disabled = true;
    }
  /*
    // Ajouter un événement de clic pour chaque bouton "Action"
    const buttons = detailWindow.querySelectorAll(".btn");
    buttons.forEach((button, index) => {
      button.addEventListener("click", function() {
        performAction(index + 1, combatant); // Appeler la fonction performAction avec l'index de l'action et le combattant
      });
    });
*/
    detailWindow.classList.remove("modal");
    detailWindow.classList.add("modal-dialog-centered");
    // Afficher la fenêtre modale de détail
    detailContainer.innerHTML = "";
    detailContainer.appendChild(detailWindow);
    detailWindow.style.display = "block";
  }


  function populateTable(combatants) {
    combatantTableBody.innerHTML = "";
  
    // Calculer le nombre total de pages
    const totalPages = Math.ceil(combatants.length / itemsPerPage);
  
    // Vérifier si la page actuelle dépasse le nombre total de pages
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
  
    // Calculer l'index de début et de fin des combattants pour la page actuelle
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, combatants.length);
    const selectedCombatants = combatants.slice(startIndex, endIndex);
  
    for (const combatant of selectedCombatants) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${combatant.nom}</td>
        <td>${combatant.vitalite}</td>
        <td>${combatant.endurance}</td>
        <td>${combatant.puissance}</td>
        <td>${combatant.dexterite}</td>
        <td>${combatant.fatigue}</td>
        <td>${combatant.niveau}</td>`;
  
      row.addEventListener("click", function() {
        fillDetailWindow(combatant);
      });
      combatantTableBody.appendChild(row);
    }
  
    // Mettre à jour les boutons de pagination
    updatePaginationButtons();
  }
  



  let currentPage = 1;
  const itemsPerPage = 10;
  
  // Fonction pour afficher les combattants de la page actuelle
  function displayCurrentPage(combatants) {
    combatantTableBody.innerHTML = "";
  
    // Calculer l'index de début et de fin des combattants pour la page actuelle
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const selectedCombatants = combatants.slice(startIndex, endIndex);
  
    for (const combatant of selectedCombatants) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${combatant.nom}</td>
        <td>${combatant.vitalite}</td>
        <td>${combatant.endurance}</td>
        <td>${combatant.puissance}</td>
        <td>${combatant.dexterite}</td>
        <td>${combatant.fatigue}</td>
        <td>${combatant.niveau}</td>`;
  
      row.addEventListener("click", function() {
        fillDetailWindow(combatant);
      });
      combatantTableBody.appendChild(row);
    }
  
    // Mettre à jour les boutons de pagination
    updatePaginationButtons();
  }
  
  // Fonction pour aller à la page suivante
  function goToNextPage() {
    currentPage++;
    displayCurrentPage(combatants);
  }
  
  // Fonction pour aller à la page précédente
  function goToPreviousPage() {
    currentPage--;
    displayCurrentPage(combatants);
  }
  
  // Fonction pour aller à la première page
  function goToFirstPage() {
    currentPage = 1;
    displayCurrentPage(combatants);
  }
  
  // Fonction pour aller à la dernière page
  function goToLastPage() {
    const totalPages = Math.ceil(combatants.length / itemsPerPage);
    currentPage = totalPages;
    displayCurrentPage(combatants);
  }
  
  // Fonction pour aller en arrière de 5 pages
  function goBackFivePages() {
    currentPage -= 5;
    if (currentPage < 1) {
      currentPage = 1;
    }
    displayCurrentPage(combatants);
  }
  
  // Fonction pour avancer de 5 pages
  function goForwardFivePages() {
    const totalPages = Math.ceil(combatants.length / itemsPerPage);
    currentPage += 5;
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    displayCurrentPage(combatants);
  }
  
  // Fonction pour mettre à jour l'état des boutons de pagination
  function updatePaginationButtons() {
    const totalPages = Math.ceil(combatants.length / itemsPerPage);
  
    document.getElementById("premier").disabled = currentPage === 1;
    document.getElementById("dernier").disabled = currentPage === totalPages;
    document.getElementById("moinsun").disabled = currentPage === 1;
    document.getElementById("plusun").disabled = currentPage === totalPages;
    document.getElementById("moinscinq").disabled = currentPage <= 5;
    document.getElementById("pluscinq").disabled = currentPage + 5 > totalPages;
  }
  
  // Ajouter les écouteurs d'événements pour les boutons de pagination
  document.getElementById("moinsun").addEventListener("click", goToPreviousPage);
  document.getElementById("moinscinq").addEventListener("click", goBackFivePages);
  document.getElementById("premier").addEventListener("click", goToFirstPage);
  document.getElementById("dernier").addEventListener("click", goToLastPage);
  document.getElementById("plusun").addEventListener("click", goToNextPage);
  document.getElementById("pluscinq").addEventListener("click", goForwardFivePages);


  const combattreButton = document.getElementById("combattre");

    // Événement pour combattre le combattant sélectionné
    combattreButton.addEventListener("click", function() {
        if (selectedCombatant) {
            // Ajouter de la fatigue au combattant sélectionné
            switch (selectedCombatant.fatigue)
            {
              case 0:
                selectedCombatant.fatigue += 10;
                break;
              case 10:
                selectedCombatant.fatigue += 20;
                break;
              case 30:
                selectedCombatant.fatigue += 30;
                break;
              case 60:
                selectedCombatant.fatigue += 40;
                break;
            }

            // Augmenter le niveau du combattant sélectionné de 1
            selectedCombatant.niveau += 1;

            // Mettre à jour les détails du combattant dans l'interface
            updateCombatant(selectedCombatant);
            fillDetailWindow(selectedCombatant);
        }
    });