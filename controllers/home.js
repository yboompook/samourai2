$(document).ready(function() {
  
  // Requête AJAX pour récupérer les données du joueur
  $.ajax({
    url: "/api/joueur",
    method: "GET",
    dataType: "json",
    success: function(response) {
      console.log(response.joueur);
      var joueur = response.joueur;
      // Remplacer les données du joueur dans le tableau
      $("#id_joueur").text(joueur.Id_joueur);
      $("#pseudo").text(joueur.pseudo);
      $("#prenom").text(joueur.prenom);
      $("#description").text(joueur.description);
      $("#isadmin").text(joueur.isadmin);
      $("#lvlforgeron").text(joueur.lvlforgeron);
      $("#lvlcuisinier").text(joueur.lvlcuisinier);
      $("#forgeText").text(joueur.forge);
      $("#cuisineText").text(joueur.cuisine);
      $("#mineText").text(joueur.mine);
      $("#campText").text(joueur.camp);
      $("#champText").text(joueur.champ);
      $("#cariereText").text(joueur.cariere);
      $("#fer").text(joueur.fer);
      $("#bois").text(joueur.bois);
      $("#ingredient").text(joueur.ingredient);
      $("#pierre").text(joueur.pierre);
      $("#gold").text(joueur.gold);
    },
    error: function(xhr, status, error) {
      console.error("Une erreur est survenue lors de la récupération des données du joueur:", error);
    }
  });
});
const clickableDiv = document.querySelector('.clickable-div');

clickableDiv.addEventListener('click', function() {
  // Code à exécuter lorsque la div est cliquée
  console.log('La div a été cliquée !');
});
var openButtons = document.querySelectorAll('.open-popup');
var closeButtons = document.querySelectorAll('.close-popup');
var popups = document.querySelectorAll('.popup');
document.addEventListener('DOMContentLoaded', () => {
  // Récupérer tous les éléments déclencheurs de pop-up
  const triggerElements = document.querySelectorAll('.open-popup');

  // Ajouter un gestionnaire d'événement de clic à chaque élément déclencheur
  triggerElements.forEach((triggerElement) => {
    triggerElement.addEventListener('click', () => {
      // Récupérer la pop-up associée à l'élément déclencheur
      const popup = triggerElement.nextElementSibling;

      // Afficher la pop-up en modifiant le style display à 'flex'
      popup.style.display = 'flex';
    });
  });

  // Récupérer tous les boutons de fermeture de pop-up
  const closeButtons = document.querySelectorAll('.close-popup');

  // Ajouter un gestionnaire d'événement de clic à chaque bouton de fermeture
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
      // Récupérer la pop-up associée au bouton de fermeture
      const popup = closeButton.closest('.popup');

      // Masquer la pop-up en modifiant le style display à 'none'
      popup.style.display = 'none';
    });
  });
});