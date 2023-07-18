
  // Récupérer les références des boutons
  const home = document.getElementById('home');
  const combatant = document.getElementById('combatant');
  const profil = document.getElementById('profil');
  const clan = document.getElementById('clan');
  const message = document.getElementById('message');
  const admin = document.getElementById('admin');
  // ...

  // Ajouter les listeners aux boutons
  home.addEventListener('click', () => {
    window.location.href = '/home'; // Rediriger vers la route '/home' définie dans route.js
  });

  combatant.addEventListener('click', () => {
    window.location.href = '/combatant';
  });

  profil.addEventListener('click', () => {
    window.location.href = '/profil';
  });

  clan.addEventListener('click', () => {
    window.location.href = '/clan';
  });

  message.addEventListener('click', () => {
    window.location.href = '/message';
  });

  admin.addEventListener('click', () => {
    window.location.href = '/admin';
  });