# Utiliser une image de base
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers du projet
COPY package.json package-lock.json* ./
RUN npm install --only=production

# Copier le reste des fichiers
COPY . .

# Exposer le port utilisé par l'API
EXPOSE 3000

# Démarrer le serveur Node.js
CMD ["node", "server.js"]