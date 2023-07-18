
CREATE TABLE joueur(
   Id_joueur INT AUTO_INCREMENT,
   pseudo VARCHAR(50)  NOT NULL,
   prenom VARCHAR(50) ,
   description TEXT,
   mdp VARCHAR(50)  NOT NULL,
   isadmin BOOLEAN NOT NULL,
   lvlforgeron TINYINT NOT NULL,
   forge TINYINT NOT NULL,
   mine TINYINT NOT NULL,
   camp TINYINT NOT NULL,
   fer INT NOT NULL,
   bois INT NOT NULL,
   gold INT NOT NULL,
   PRIMARY KEY(Id_joueur),
   UNIQUE(pseudo)
);

CREATE TABLE combatant(
   Id_combatant INT AUTO_INCREMENT,
   vitalite TINYINT NOT NULL,
   endurance TINYINT NOT NULL,
   puissance TINYINT NOT NULL,
   dexterite TINYINT NOT NULL,
   fatigue TINYINT NOT NULL,
   niveau TINYINT NOT NULL,
   Id_joueur INT NOT NULL,
   PRIMARY KEY(Id_combatant),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur)
);

CREATE TABLE equipement(
   Id_equipement INT AUTO_INCREMENT,
   nom VARCHAR(50)  NOT NULL,
   type VARCHAR(50) ,
   attaque TINYINT,
   defence TINYINT,
   degat TINYINT,
   solidite TINYINT,
   usure TINYINT,
   effet VARCHAR(50)  NOT NULL,
   puissance TINYINT,
   Id_joueur INT NOT NULL,
   Id_combatant INT NOT NULL,
   PRIMARY KEY(Id_equipement),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur),
   FOREIGN KEY(Id_combatant) REFERENCES combatant(Id_combatant)
);

CREATE TABLE marche(
   Id_marche INT AUTO_INCREMENT,
   PRIMARY KEY(Id_marche)
);

CREATE TABLE clan(
   Id_clan INT AUTO_INCREMENT,
   nom VARCHAR(50) ,
   description TEXT,
   PRIMARY KEY(Id_clan)
);

CREATE TABLE forum(
   Id_forum INT AUTO_INCREMENT,
   nom VARCHAR(50)  NOT NULL,
   ispublic BOOLEAN NOT NULL,
   Id_clan INT NOT NULL,
   PRIMARY KEY(Id_forum),
   FOREIGN KEY(Id_clan) REFERENCES clan(Id_clan)
);

CREATE TABLE topic(
   Id_topic INT AUTO_INCREMENT,
   titre VARCHAR(100)  NOT NULL,
   lecture BOOLEAN NOT NULL,
   epingle BOOLEAN NOT NULL,
   Id_forum INT NOT NULL,
   PRIMARY KEY(Id_topic),
   FOREIGN KEY(Id_forum) REFERENCES forum(Id_forum)
);

CREATE TABLE messageprive(
   Id_messageprive INT AUTO_INCREMENT,
   titre VARCHAR(100) ,
   corps TEXT,
   jour INT,
   Id_joueur INT NOT NULL,
   Id_joueur_1 INT NOT NULL,
   PRIMARY KEY(Id_messageprive),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur),
   FOREIGN KEY(Id_joueur_1) REFERENCES joueur(Id_joueur)
);

CREATE TABLE message(
   Id_message INT AUTO_INCREMENT,
   corps TEXT NOT NULL,
   Id_joueur INT NOT NULL,
   Id_topic INT NOT NULL,
   PRIMARY KEY(Id_message),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur),
   FOREIGN KEY(Id_topic) REFERENCES topic(Id_topic)
);

CREATE TABLE agrandir(
   batiment VARCHAR(50) ,
   niveau TINYINT,
   fer SMALLINT NOT NULL,
   bois SMALLINT NOT NULL,
   gold SMALLINT NOT NULL,
   PRIMARY KEY(batiment, niveau)
);

CREATE TABLE fabriquer(
   nom VARCHAR(50) ,
   type VARCHAR(50)  NOT NULL,
   attaque TINYINT NOT NULL,
   defence TINYINT NOT NULL,
   degat TINYINT NOT NULL,
   solidite TINYINT NOT NULL,
   usure TINYINT NOT NULL,
   fer TINYINT NOT NULL,
   bois TINYINT NOT NULL,
   gold TINYINT NOT NULL,
   lvlforge TINYINT NOT NULL,
   lvlforgeron TINYINT NOT NULL,
   PRIMARY KEY(nom)
);

CREATE TABLE suivre_joueur(
   Id_joueur INT,
   Id_joueur_1 INT,
   PRIMARY KEY(Id_joueur, Id_joueur_1),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur),
   FOREIGN KEY(Id_joueur_1) REFERENCES joueur(Id_joueur)
);

CREATE TABLE suivre_combatant(
   Id_joueur INT,
   Id_combatant INT,
   PRIMARY KEY(Id_joueur, Id_combatant),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur),
   FOREIGN KEY(Id_combatant) REFERENCES combatant(Id_combatant)
);

CREATE TABLE vendre_equipement(
   Id_equipement INT,
   Id_marche INT,
   prix INT NOT NULL,
   PRIMARY KEY(Id_equipement, Id_marche),
   FOREIGN KEY(Id_equipement) REFERENCES equipement(Id_equipement),
   FOREIGN KEY(Id_marche) REFERENCES marche(Id_marche)
);

CREATE TABLE vendre_ressource(
   Id_joueur INT,
   Id_marche INT,
   nom VARCHAR(50)  NOT NULL,
   quantité INT NOT NULL,
   prix INT NOT NULL,
   achat BOOLEAN,
   PRIMARY KEY(Id_joueur, Id_marche),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur),
   FOREIGN KEY(Id_marche) REFERENCES marche(Id_marche)
);

CREATE TABLE appartenir(
   Id_joueur INT,
   Id_clan INT,
   iscreateur BOOLEAN NOT NULL,
   isadmin BOOLEAN NOT NULL,
   PRIMARY KEY(Id_joueur, Id_clan),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur),
   FOREIGN KEY(Id_clan) REFERENCES clan(Id_clan)
);

CREATE TABLE combatre(
   Id_joueur INT,
   Id_joueur_1 INT,
   nombre_de_round TINYINT NOT NULL,
   resultat VARCHAR(50)  NOT NULL,
   PRIMARY KEY(Id_joueur, Id_joueur_1),
   FOREIGN KEY(Id_joueur) REFERENCES joueur(Id_joueur),
   FOREIGN KEY(Id_joueur_1) REFERENCES joueur(Id_joueur)
);

CREATE TABLE vendre_combatant(
   Id_combatant INT,
   Id_marche INT,
   prix INT NOT NULL,
   PRIMARY KEY(Id_combatant, Id_marche),
   FOREIGN KEY(Id_combatant) REFERENCES combatant(Id_combatant),
   FOREIGN KEY(Id_marche) REFERENCES marche(Id_marche)
);
