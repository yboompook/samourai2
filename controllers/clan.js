  document.addEventListener("DOMContentLoaded", function() {
    const clanSection = document.getElementById("clanSection");
    const noClanSection = document.getElementById("noClanSection");
    const joinClanButton = document.getElementById("joinClanButton");
    const createClanButton = document.getElementById("createClanButton");
    const joinClanPopup = document.getElementById("joinClanPopup");
    const createClanPopup = document.getElementById("createClanPopup");
    const leaveDeleteButtonDiv = document.getElementById("leaveDeleteButton");
  
    // Ici, vous devrez déterminer si le joueur a déjà un clan ou non
    fetch("/api/clan")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Réponse réseau non valide");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Données du clan :", data); // Vérifiez les données récupérées dans la console

      // Vérifier si le joueur a un clan ou non
      if (data.clan) {
        // Le joueur a un clan, afficher la section "Clan" avec les informations du clan
        clanSection.hidden = false;
        noClanSection.hidden = true;
        if (data.clan.Appartenir.iscreateur) {
            const leaveDeleteButton = document.createElement("button");
            leaveDeleteButton.className = "btn btn-danger";
            leaveDeleteButton.textContent = "Supprimer l'alliance";
            // Ajouter un gestionnaire d'événement pour le clic sur le bouton
            leaveDeleteButton.addEventListener("click", async () => {
                try {
                  await dissolveClan(data.clan.Id_clan);
                  window.location.href = "/clan"; // Redirection vers la page du clan
                  // Effectuez toute action supplémentaire après la dissolution du clan
                } catch (error) {
                  console.error("Erreur lors de la dissolution du clan:", error);
                  alert("Une erreur est survenue lors de la dissolution du clan.");
                }
              });
          
            // Ajouter le bouton à l'élément div
            leaveDeleteButtonDiv.appendChild(leaveDeleteButton);
          } else {
            const leaveDeleteButton = document.createElement("button");
            leaveDeleteButton.className = "btn btn-secondary";
            leaveDeleteButton.textContent = "Quitter l'alliance";
            // Ajouter un gestionnaire d'événement pour le clic sur le bouton
            leaveDeleteButton.addEventListener("click", async () => {
                try {
                  await quitClan(data.clan.Id_clan);
                  window.location.href = "/clan"; // Redirection vers la page du clan
                  // Effectuez toute action supplémentaire après le départ du clan
                } catch (error) {
                  console.error("Erreur lors de la sortie du clan:", error);
                  alert("Une erreur est survenue lors de la sortie du clan.");
                }
              });
              
          
            // Ajouter le bouton à l'élément div
            leaveDeleteButtonDiv.appendChild(leaveDeleteButton);
          }
          
        // Afficher le nom du clan et le nombre de membres dans la section "Clan"
        const clanNameSpan = document.getElementById("clanName");
        const clanMembersSpan = document.getElementById("clanMembers");
        clanNameSpan.textContent = data.clan.nom;
        clanMembersSpan.textContent = data.clan.nbMembres;
        fetchClanDetails(data.clan.Id_clan);
        //clanMembersSpan.textContent = data.clan[0].nbMembres;
      } else {
        // Le joueur n'a pas de clan, afficher la section "Pas de clan"
        clanSection.hidden = true;
        noClanSection.hidden = false;
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération du clan du joueur:", error);
    });

    // Événement pour le bouton "Rejoindre un clan"
    joinClanButton.addEventListener("click", function() {
    // Charger les données des clans disponibles et afficher le pop-up pour rejoindre un clan
    fetch("/api/clans/sorted")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Réponse réseau non valide");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données des clans :", data); // Vérifiez les données récupérées dans la console
        // Appeler la fonction pour afficher le pop-up et les clans disponibles
        showJoinClanPopup(data.clans);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du clan du joueur:", error);
      });
  });
  
    // Événement pour le bouton "Créer un clan"
    createClanButton.addEventListener("click", function() {
      // Afficher le pop-up pour créer un clan
      showCreateClanPopup();
    });
  
    // Événement pour soumettre le formulaire de création de clan
const createClanForm = document.getElementById("createClanForm");
createClanForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const clanNameInput = document.getElementById("clanNameInput");
  const newClanName = clanNameInput.value.trim();

  try {
    // Envoi de la demande pour créer un nouveau clan via la route
    const response = await fetch("/api/clan/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: newClanName,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Le clan a été créé avec succès
      console.log("Le clan a été créé avec succès.");
      // Ici, vous pouvez ajouter le nouveau clan à la liste des clans
      // et ajouter le joueur comme membre fondateur.
      // Ensuite, effectuez la redirection vers la page du clan.
      window.location.href = "/clan"; // Redirection vers la page du clan
    } else {
      // Il y a eu une erreur lors de la création du clan
      console.error("Erreur lors de la création du clan:", data.message);
      alert("Une erreur est survenue lors de la création du clan.");
    }
  } catch (error) {
    console.error("Erreur lors de la création du clan:", error);
    alert("Une erreur est survenue lors de la création du clan.");
  }
});

const table = document.createElement("table");

    // Fonction pour afficher le pop-up pour rejoindre un clan
function showJoinClanPopup(clansData) {
    const clansList = document.getElementById("clansList");
    clansList.innerHTML = ""; // Supprimer le contenu existant

  
    clansData.forEach(clan => {
        const row = document.createElement("tr");
      
        const nameCell = document.createElement("td");
        nameCell.textContent = clan.nom;
      
        const memberCountCell = document.createElement("td");
        memberCountCell.textContent = clan.nbMembres;
      
        const joinButtonCell = document.createElement("td");
        const joinButton = document.createElement("button");
        joinButton.className = "btn btn-primary join-button";
        joinButton.setAttribute("data-clan-id", clan.Id_clan);
        joinButton.textContent = "Rejoindre";
      
        joinButtonCell.appendChild(joinButton);
      
        row.appendChild(nameCell);
        row.appendChild(memberCountCell);
        row.appendChild(joinButtonCell);
      
        table.appendChild(row);
      });
      
      // Ajouter la table au conteneur des clans
      clansList.appendChild(table);
  
    // Afficher le pop-up pour rejoindre un clan
    joinClanPopup.classList.remove("d-none");
    joinClanPopup.classList.add("d-flex");
  
    // Ajouter des gestionnaires d'événements aux boutons de rejoindre un clan
    const joinButtons = document.querySelectorAll(".join-button");
    joinButtons.forEach(button => {
      button.addEventListener("click", async function () {
        const clanId = button.getAttribute("data-clan-id");
        try {
          // Envoyer la demande pour rejoindre le clan via la route
          const response = await fetch(`/api/clan/${clanId}/rejoindre`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          const data = await response.json();
  
          if (response.ok) {
            // Le joueur a rejoint le clan avec succès
            console.log("Le joueur a rejoint le clan avec succès.");
            // Actualiser la page pour afficher les nouvelles informations du clan
            window.location.reload();
          } else {
            // Il y a eu une erreur lors du rejoindre du clan
            console.error("Erreur lors du rejoindre du clan:", data.message);
            alert("Une erreur est survenue lors du rejoindre du clan.");
          }
        } catch (error) {
          console.error("Erreur lors du rejoindre du clan:", error);
          alert("Une erreur est survenue lors du rejoindre du clan.");
        }
      });
    });
  }
  
  
    // Fonction pour afficher le pop-up pour créer un clan
    function showCreateClanPopup() {
        createClanPopup.classList.remove("d-none");
        createClanPopup.classList.add("d-flex");
    }
  
    // Fonction pour masquer le pop-up de création de clan
    function hideCreateClanPopup() {
        createClanPopup.classList.add("d-none");
    }
  
    // Fonction pour cacher la pop-up "Rejoindre un clan"
    function hideJoinClanPopup() {
        joinClanPopup.classList.add("d-none");
    }

    // Fonction pour vérifier si le nom du clan est unique
    function isClanNameUnique(clanName) {
      // Ici, vous devrez vérifier si le nom du clan n'est pas déjà utilisé
      // par un autre clan existant.
      // Vous pouvez utiliser la variable clansData pour vérifier les noms des clans existants.
      // Cette fonction devrait renvoyer true si le nom est unique, et false sinon.
      return true; // Remplacez ceci par la vérification réelle
    }
    
    
    // Événement pour le bouton de fermeture du pop-up "Rejoindre un clan"
    const joinClanPopupCloseButton = document.querySelector("#joinClanPopup .btn-close");
    joinClanPopupCloseButton.addEventListener("click", hideJoinClanPopup);

    // Événement pour masquer le pop-up "Rejoindre un clan" lorsqu'on clique en dehors du pop-up
    joinClanPopup.addEventListener("click", function(event) {
        if (event.target === this) {
        hideJoinClanPopup();
        }
    });

    // Événement pour le bouton de fermeture du pop-up "Créer un clan"
    const createClanPopupCloseButton = document.querySelector("#createClanPopup .btn-close");
    createClanPopupCloseButton.addEventListener("click", hideCreateClanPopup);

    // Événement pour masquer le pop-up "Créer un clan" lorsqu'on clique en dehors du pop-up
    createClanPopup.addEventListener("click", function(event) {
        if (event.target === this) {
        hideCreateClanPopup();
        }
    });
    
    /*
    async function fetchClanDetails(clanId) {
        const response = await fetch(`/api/clan/${clanId}/details`);
        const data = await response.json();
        const clanPlayers = data.clan.Appartenirs;
    
        // Sélectionner le tbody du tableau pour y ajouter les données
        const tbody = document.getElementById('clanPlayers');
    
        // Boucler à travers les joueurs du clan et ajouter les données au tableau
        clanPlayers.forEach((player) => {
          const row = document.createElement('tr');
          const playerNameCell = document.createElement('td');
          playerNameCell.textContent = player.Joueur.pseudo;
          const playerCombatantsCell = document.createElement('td');
          playerCombatantsCell.textContent = player.Joueur.Combatants[0].nombre_combattants;
    
          row.appendChild(playerNameCell);
          row.appendChild(playerCombatantsCell);
          tbody.appendChild(row);
        });
      }*/


      async function fetchClanDetails(clanId) {
        try {
          const response = await fetch(`/api/clan/${clanId}/details`);
          const data = await response.json();
          const clanPlayers = data.clan.Appartenirs;
      
          // Sélectionner le tbody du tableau pour y ajouter les données
          const tbody = document.getElementById('clanPlayers');
          tbody.innerHTML = ''; // Effacer le contenu précédent du tbody pour éviter les duplications
      
          // Boucler à travers les joueurs du clan et ajouter les données au tableau
          clanPlayers.forEach((player) => {
            const row = document.createElement('tr');
            const playerNameCell = document.createElement('td');
            playerNameCell.textContent = player.Joueur.pseudo;
            const playerCombatantsCell = document.createElement('td');
            
            // Vérifier si la propriété "combatantCount" est définie pour le joueur
            // Si c'est le cas, afficher le nombre de combattants, sinon afficher "N/A"
            if (player.Joueur.combatantCount !== undefined) {
              playerCombatantsCell.textContent = player.Joueur.combatantCount;
            } else {
              playerCombatantsCell.textContent = 'N/A';
            }
      
            row.appendChild(playerNameCell);
            row.appendChild(playerCombatantsCell);
            tbody.appendChild(row);
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des détails du clan:', error);
        }
      }

    hideCreateClanPopup();
    hideJoinClanPopup();
  });


  async function dissolveClan(clanId) {
  const response = await fetch(`/api/clan/${clanId}/dissolve`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("Erreur lors de la dissolution du clan: " + responseData.message);
  }

  console.log("Le clan a été dissous avec succès.");
}

async function quitClan(clanId) {
  const response = await fetch(`/api/clan/${clanId}/quit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("Erreur lors de la sortie du clan: " + responseData.message);
  }

  console.log("Le joueur a quitté le clan avec succès.");
}
