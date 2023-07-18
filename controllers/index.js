// Gérer le clic sur le bouton d'inscription
document.getElementById("inscriptionButton").addEventListener("click", function() {
  // Rediriger vers l'URL d'inscription dans Express
  window.location.href = "/inscription";
});

// Gérer le clic sur le bouton de connexion
document.getElementById("connexionButton").addEventListener("click", function() {
  // Rediriger vers l'URL de connexion dans Express
  window.location.href = "/connexion";
});