# Gestion Livres - Bibliothèque d'Entrepreneuriat

Une application complète de gestion de livres sur l'entrepreneuriat utilisant Docker, Node.js, MySQL et Bootstrap.

## À propos du projet

Cette application permet de gérer une collection de livres sur l'entrepreneuriat, la finance, le marketing et d'autres sujets connexes. Elle est construite avec une architecture moderne à trois niveaux (base de données, API et frontend) et déployée via Docker.

## Fonctionnalités

- 📚 Affichage des livres par catégorie
- 🔍 Filtrage par type de contenu
- ➕ Ajout de nouveaux livres
- 🗑️ Suppression de livres (avec confirmation)
- 💰 Affichage des prix et années de publication
- 📱 Interface responsive

## Technologies utilisées

- **Base de données** : MySQL 8
- **Backend** : Node.js avec Express
- **Frontend** : HTML/CSS/JavaScript avec Bootstrap 5
- **Infrastructure** : Docker et Docker Compose
- **Serveur web** : Nginx (pour servir le frontend)

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Git (pour le clonage du dépôt)

## Installation et démarrage

### 1. Cloner le dépôt

```bash
git clone https://github.com/mohawhite/GestionLivres.git
cd GestionLivres
```

### 2. Démarrer l'application avec Docker Compose

```bash
docker-compose up -d
```

Cette commande va:
- Construire les images Docker nécessaires
- Créer et démarrer les conteneurs
- Configurer les réseaux entre les services
- Initialiser la base de données avec les 25 livres d'exemple

### 3. Accéder à l'application

Ouvrez votre navigateur et accédez à:
```
http://localhost:8080
```

## Structure du projet

```
GestionLivres/
├── db-init/                # Scripts d'initialisation de la base de données
│   └── init.sql            # Création de tables et données initiales
├── node-api/               # API backend
│   ├── Dockerfile          # Configuration Docker pour l'API
│   ├── package.json        # Dépendances Node.js
│   └── server.js           # Code source de l'API
├── frontend/               # Interface utilisateur
│   ├── Dockerfile          # Configuration Docker pour le frontend
│   ├── index.html          # Page HTML principale
│   ├── style.css           # Styles CSS
│   ├── script.js           # JavaScript pour l'interaction
│   └── nginx.conf          # Configuration du serveur Nginx
├── docker-compose.yml      # Configuration Docker Compose
└── README.md               # Documentation
```

## Commandes utiles

### Docker

```bash
# Démarrer les conteneurs en arrière-plan
docker-compose up -d

# Voir les logs en temps réel
docker-compose logs -f

# Arrêter tous les conteneurs
docker-compose down

# Reconstruire après modifications
docker-compose up -d --build
```

### Base de données

Pour se connecter directement à la base de données:

```bash
docker exec -it gestionlivres-db-1 mysql -uroot -proot bookdb
```

Quelques requêtes SQL utiles:
```sql
-- Voir tous les livres
SELECT * FROM books;

-- Compter les livres par catégorie
SELECT category, COUNT(*) FROM books GROUP BY category;
```

## API Endpoints

- `GET /books` - Récupérer tous les livres
- `GET /books?category=Finance%20Personnelle` - Filtrer par catégorie
- `GET /books/:id` - Récupérer un livre spécifique
- `POST /books` - Ajouter un nouveau livre
- `PUT /books/:id` - Mettre à jour un livre
- `DELETE /books/:id` - Supprimer un livre

## Contact

Mohamed - [@mohawhite](https://github.com/mohawhite)

Lien du projet: [https://github.com/mohawhite/GestionLivres](https://github.com/mohawhite/GestionLivres)