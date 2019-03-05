# Multi-Terminaux
Le projet qu'on a décidé de mettre en place est une application qui aide à retrouver un produit alimentaire, un moteur de recherche pour la nourriture d'où le Foogle.

L'application pourra être installé sur Android, IOS. Vu qu'on a utilisé Cordova.
Sur Ordinateur grâce à Electron.
Bien sûr sur navigateur sur machine ou mobile (responsive Bootstrap)

Comme Base de données on a utilisé l'API fournit par OpenFoodFacts, donc pas besoin d'exporter les données (gigantesques) qui sont aussi fournit par cette dernière. Pour plus d'infos : https://world.openfoodfacts.org/who-we-are 

La recherche d'un produit par code barre est possible d'où l'utilisation du plugin: https://github.com/phonegap/phonegap-plugin-barcodescanner
# Sur navigateur
Dossier : www
Pour démarrer le site, il faut avoir un serveur http :  npm install http-server -g 
Executer le serveur :npx http-server 

# Installation Cordova et utilisation
Dossier: cordova
Il faut avoir node.js pour utiliser le gestionnaire des package npm .
La commande pour installer Cordova:  npm install -g cordova 
Pour tester sur android: https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html (JDK Android) => cordova run android
pour ios: Xcode => cordova run ios
pour tester sur navigateur => cordova run browser

# Installation Electron 
Dossier: electron
prérequis npm:
Commande pour installer : npm i -D electron-nightly
1) Clonez le dépôt Quick Start
$ git clone https://github.com/electron/electron-quick-start
2)Allez dans le dépôt
$ cd electron-quick-start
3) coller le contenu du dossier "electron" sur dans le depôt
4)Installez les dépendances et lancez l'app
$ npm install && npm start


# Difficultés rencontrés / perspectives
  
  -  Compréhension de la base de données fournit par l'API
  - Installation du plugin pour le code barre (erreurs lors de la capture : problème corrigé)
  - pouvoir tester sur mobile (on a pas pu le tester sur ios)  aucun problème avec android
  - comme le site est responsive, ca nous a faciliter la portabilité
  

# Choix des technologies
  AngularJs: libraire qui nous a énormement aider pour rendre le site dynamique et avoir la sensation d'utiliser une application, en plus de ca on pouvait interagir facilement avec l'api
  Cordova : Connu, facile à installer.
  Electron: facile à installer, et à utiliser.
  
