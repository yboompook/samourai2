// Fonction pour remplir le tableau des messages envoyés
async function fillSentMessagesTable() {
    const sentTableBody = document.querySelector('#sentMessagesTable');
    
    try {
      const response = await fetch('/api/messageprive/sent');
      const data = await response.json();
      const messagesSent = data.sentMessages;
      console.log(messagesSent);
      
      if (messagesSent && messagesSent.length > 0) {
        messagesSent.forEach(message => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${message.titre}</td>
            <td>${message.jour}</td>
          `;
          sentTableBody.appendChild(row);
        });
      } else {
        // Si le joueur n'a pas de messages envoyés, afficher un message ou laisser le tableau vide.
        console.log('Le joueur n\'a pas de messages envoyés.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des messages envoyés:', error);
    }
  }
  
  // Fonction pour remplir le tableau des messages reçus
  async function fillReceivedMessagesTable() {
    const receivedTableBody = document.querySelector('#receivedMessagesTable');
    
    try {
      const response = await fetch('/api/messageprive/received');
      const data = await response.json();
      const messagesReceived = data.sentMessages; // Utiliser le bon nom de propriété ici
      console.log(messagesReceived);
    
      if (messagesReceived && messagesReceived.length > 0) {
        messagesReceived.forEach(message => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${message.titre}</td>
            <td>${message.jour}</td>
          `;
          receivedTableBody.appendChild(row);
        });
      } else {
        // Si le joueur n'a pas de messages reçus, afficher un message ou laisser le tableau vide.
        console.log('Le joueur n\'a pas de messages reçus.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des messages reçus:', error);
    }
  }
  
  // Appel des fonctions pour remplir les tableaux au chargement de la page
  document.addEventListener('DOMContentLoaded', () => {
    fillSentMessagesTable();
    fillReceivedMessagesTable();
    fillSelectPlayerPopup();
  });



  // Fonction pour afficher la popup de création de message
function showCreateMessagePopup() {
    const createMessagePopup = document.querySelector('#createMessagePopup');
    createMessagePopup.classList.remove('d-none');
    createMessagePopup.classList.add("d-flex");
  }
  
  // Fonction pour masquer la popup de création de message
  function hideCreateMessagePopup() {
    const createMessagePopup = document.querySelector('#createMessagePopup');
    createMessagePopup.classList.add('d-none');
    createMessagePopup.classList.remove("d-flex");
  }
  
  // Appel la fonction pour afficher la popup lors du clic sur le bouton "Envoyer un message"
  const createMessageButton = document.querySelector('#createMessageButton');
  createMessageButton.addEventListener('click', showCreateMessagePopup);
  
  // Appel la fonction pour masquer la popup lors du clic sur le bouton "Fermer"
  const closePopupButton = document.querySelector('#closePopupButton');
  closePopupButton.addEventListener('click', hideCreateMessagePopup);
  
  // Appel la fonction pour masquer la popup lors du clic en dehors de la popup
  window.addEventListener('click', (event) => {
    const createMessagePopup = document.querySelector('#createMessagePopup');
    if (event.target === createMessagePopup) {
      hideCreateMessagePopup();
    }
  });
  /*
  // Appel la fonction pour créer un nouveau message lors du clic sur le bouton "Envoyer"
  const sendMessageButton = document.querySelector('#sendMessageButton');
  sendMessageButton.addEventListener('click', async () => {
    const joueurVise = document.querySelector('#joueurVise').value;
    const titre = document.querySelector('#messageTitle').value;
    const corps = document.querySelector('#messageBody').value;
    
    try {
      const response = await fetch('/api/messageprive/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          joueurVise: joueurVise,
          titre: titre,
          corps: corps
        })
      });
  
      if (response.ok) {
        // Message envoyé avec succès, recharger la page pour mettre à jour la liste des messages
        location.reload();
      } else {
        console.error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  });
  // Sélectionnez le bouton "Envoyer"
//const sendMessageButton = document.querySelector('#sendMessageButton');
*/
// Sélectionnez les champs
const joueurViseField = document.querySelector('#joueurVise');
const messageTitleField = document.querySelector('#messageTitle');
const messageBodyField = document.querySelector('#messageBody');

// Fonction pour mettre à jour l'état du bouton "Envoyer"
function updateSendButtonState() {
    const sendMessageButton = document.querySelector('#sendMessageButton');
  if (joueurViseField.value && messageTitleField.value && messageBodyField.value) {
    sendMessageButton.disabled = false;
  } else {
    sendMessageButton.disabled = true;
  }
}

updateSendButtonState();
// Ajoutez des écouteurs d'événements pour les champs
joueurViseField.addEventListener('input', updateSendButtonState);
messageTitleField.addEventListener('input', updateSendButtonState);
messageBodyField.addEventListener('input', updateSendButtonState);

// Sélectionnez le champ "Joueur visé"
//const joueurViseField = document.querySelector('#joueurVise');

// Sélectionnez la popup pour la sélection du joueur visé
const selectPlayerPopup = document.querySelector('#selectPlayerPopup');

// Sélectionnez le bouton pour fermer la popup de sélection du joueur
const closePlayerPopupButton = document.querySelector('#closePlayerPopupButton');

// Fonction pour afficher la popup de sélection du joueur
function showSelectPlayerPopup() {
  selectPlayerPopup.classList.remove('d-none');
  selectPlayerPopup.classList.add('d-flex');
}

// Fonction pour masquer la popup de sélection du joueur
function hideSelectPlayerPopup() {
  selectPlayerPopup.classList.add('d-none');
  selectPlayerPopup.classList.remove('d-flex');
}

// Ajoutez un écouteur d'événements pour ouvrir la popup lorsque le champ "Joueur visé" est cliqué
joueurViseField.addEventListener('click', showSelectPlayerPopup);

// Ajoutez un écouteur d'événements pour fermer la popup lorsque le bouton de fermeture est cliqué
closePlayerPopupButton.addEventListener('click', hideSelectPlayerPopup);

// Ajoutez un écouteur d'événements pour fermer la popup lorsque l'utilisateur clique en dehors de la popup
window.addEventListener('click', (event) => {
  if (event.target === selectPlayerPopup) {
    hideSelectPlayerPopup();
  }
});

let currentPageNumber = 1;
const pageSize = 10;


let totalPages = 0;
let joueurs = [];
let id_joueur_selection = "";
// ...
async function fillSelectPlayerPopup(pageNumber = 1, pageSize = 10) {
    const selectPlayerTableBody = document.querySelector('#selectPlayerTable tbody');
  
    try {
      const response = await fetch(`/api/joueurs?page=${pageNumber}&size=${pageSize}`);
      joueurs = await response.json(); // Utilisez "joueurs" pour accéder au tableau de joueurs
      const totalPlayers = joueurs.length; // Supposons que joueurs soit la liste des joueurs
      totalPages = Math.ceil(totalPlayers / pageSize);

      selectPlayerTableBody.innerHTML = ''; // Réinitialise le contenu du tableau
  
      if (Array.isArray(joueurs) && joueurs.length > 0) {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
  
        for (let i = startIndex; i < endIndex && i < joueurs.length; i++) {
          const joueur = joueurs[i];
          const row = document.createElement('tr');
          row.innerHTML = `
          <td data-player-id="${joueur.Id_joueur}">${joueur.pseudo}</td>
            <td>${joueur.gold}</td>
          `;
          selectPlayerTableBody.appendChild(row);

          row.addEventListener('click', () => {
            id_joueur_selection = joueur.Id_joueur;
            joueurViseField.value = joueur.pseudo;
            hideSelectPlayerPopup(); // Hide the popup after selecting a player
          });
        }
      } else {
        console.log('Aucun joueur disponible.');
      }
  
      // Mettre à jour la pagination
  
      const currentPageElement = document.querySelector('#currentPage');
      currentPageElement.textContent = `Page ${pageNumber} / ${totalPages}`;
      
      // Mise à jour des boutons de pagination
    updatePaginationButtons(pageNumber, totalPages);
  
    } catch (error) {
      console.error('Erreur lors de la récupération des joueurs :', error);
    }
  }
  
  // ...
  
  
  sendMessageButton.addEventListener('click', async () => {
    const titre = document.querySelector('#messageTitle').value;
    const corps = document.querySelector('#messageBody').value;
  
    try {
      const response = await fetch('/api/messageprive/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        id_joueur_1: id_joueur_selection, // Use the selected player's ID
          titre: titre,
          corps: corps
        })
      });
  
      console.log(id_joueur_selection);
      console.log(titre);
      console.log(corps);
      if (response.ok) {
        // Message envoyé avec succès, recharger la page pour mettre à jour la liste des messages
        location.reload();
      } else {
        console.error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  });
  

  
  // ...
  
  // Ajoutez un écouteur d'événements pour ouvrir la popup lorsque le champ "Joueur visé" est cliqué
  joueurViseField.addEventListener('click', () => {
    currentPageNumber = 1;
    showSelectPlayerPopup();
    fillSelectPlayerPopup(); // Remplir le tableau des joueurs dans la popup
  });
  
  const prevButton = document.querySelector('#prevButton');
  const nextButton = document.querySelector('#nextButton');
  const premierPageButton = document.querySelector('#premierPageButton');
  const dernierPageButton = document.querySelector('#dernierPageButton');
  const prevPageButton = document.querySelector('#prevPageButton');
  const nextPageButton = document.querySelector('#nextPageButton');
  
  function updatePaginationButtons(currentPage, totalPages) {
    premierPageButton.style.display = currentPage > 1 ? 'inline-block' : 'none';
    dernierPageButton.style.display = currentPage < totalPages ? 'inline-block' : 'none';
    prevButton.style.display = currentPage > 1 ? 'inline-block' : 'none';
    nextButton.style.display = currentPage < totalPages ? 'inline-block' : 'none';
    nextPageButton.style.display = (totalPages >= 10 && currentPage +10 <= totalPages) ? 'inline-block' : 'none';
    prevPageButton.style.display = (totalPages >= 10 && currentPage >= 10) ? 'inline-block' : 'none';

    console.log("nombre de page : " + totalPages);

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    premierPageButton.disabled = currentPage === 1;
    dernierPageButton.disabled = currentPage === totalPages;
    nextPageButton.disabled = (totalPages >= 10 && currentPage +10 <= totalPages);
    prevPageButton.disabled = (totalPages >= 10 && currentPage >= 10);
  }
  
  
  prevButton.addEventListener('click', () => {
    if (currentPageNumber > 1) {
      currentPageNumber--;
      fillSelectPlayerPopup(currentPageNumber, pageSize);
    }
  });
  
  
  nextButton.addEventListener('click', () => {
    if (currentPageNumber < totalPages) {
      currentPageNumber++;
      fillSelectPlayerPopup(currentPageNumber, pageSize);
    }
  });

premierPageButton.addEventListener('click', () => {
  currentPageNumber = 1;
  fillSelectPlayerPopup(currentPageNumber, pageSize);
});

dernierPageButton.addEventListener('click', () => {
  currentPageNumber = Math.ceil(joueurs.length / pageSize);
  fillSelectPlayerPopup(currentPageNumber, pageSize);
});
