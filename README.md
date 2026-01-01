# Serveur Internet Sample Project

## Table des matières
1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Lancement de la stack](#lancement-de-la-stack)
4. [Création de la base de données](#création-de-la-base-de-données)
5. [Configuration du fichier `.env`](#configuration-du-fichier-env)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :
- [Node.js](https://nodejs.org/) (version LTS recommandée)
- [MariaDB](https://mariadb.org/) ou un autre serveur compatible SQL

---

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/votre-utilisateur/Serveur-Internet-Sample-Project.git
cd Serveur-Internet-Sample-Project
```

### 2. Installer les dépendances
#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

---

## Création de la base de données

1. Assurez-vous que votre serveur MariaDB est en cours d'exécution.
2. Connectez-vous à votre serveur MariaDB :
    ```bash
    mysql -u root -p
    ```
3. Exécutez le script SQL pour initialiser la base de données :
    ```bash
    source `chemin/vers/fichier/init.sql`;
    ```

Il est possible que la commande `mysql` ne fonctionne pas. Ajoutez le chemin vers le binaire installé lors de l'installation de MariaDB dans vos variables d'environnement.

---

## Configuration du fichier `.env`

1. Créez un fichier `.env` dans le dossier `backend`.
2. Ajoutez les variables suivantes pour configurer la connexion à la base de données :
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=example
    DB_NAME=tasksdb
    ```

    - **DB_HOST** : L'adresse de votre serveur MariaDB (par défaut : `localhost`).
    - **DB_USER** : Votre nom d'utilisateur MariaDB (par défaut : `root`).
    - **DB_PASSWORD** : Votre mot de passe MariaDB.
    - **DB_NAME** : Le nom de la base de données créée avec le script `init.sql`.

3. Sauvegardez le fichier.

---

Vous êtes maintenant prêt à utiliser le projet !  

## Lancement de la stack

### 1. Lancer le backend
Dans le dossier `backend` :
```bash
npm start
```

Le backend sera accessible à l'adresse indiquée dans la console (par défaut : `http://localhost:3000`).

### 2. Lancer le frontend
Dans le dossier `frontend` :
```bash
npm run dev
```

Le frontend sera accessible à l'adresse indiquée dans la console (par défaut : `http://localhost:5173`).

---