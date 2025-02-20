const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Fonction pour se connecter à la base de données avec retry
const connectWithRetry = () => {
    const db = mysql.createPool({
        host: "db",
        user: "root",
        password: "root",
        database: "bookdb",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    db.getConnection((err, connection) => {
        if (err) {
            console.error("Erreur de connexion à MySQL :", err);
            console.log("Nouvelle tentative dans 5 secondes...");
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log("✅ Connecté à MySQL !");
            connection.release();
        }
    });

    return db;
}

const db = connectWithRetry();

// Route d'accueil
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de gestion de livres entrepreneuriaux !");
});

// Récupérer tous les livres avec filtrage optionnel par catégorie
app.get("/books", (req, res) => {
    const category = req.query.category;
    let query = "SELECT * FROM books";
    let params = [];

    if (category) {
        query += " WHERE category = ?";
        params.push(category);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des livres :", err);
            res.status(500).json({ error: "Erreur serveur" });
        } else {
            res.json(results);
        }
    });
});

// Récupérer un livre par son ID
app.get("/books/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération du livre :", err);
            res.status(500).json({ error: "Erreur serveur" });
        } else if (results.length === 0) {
            res.status(404).json({ error: "Livre non trouvé" });
        } else {
            res.json(results[0]);
        }
    });
});

// Ajouter un livre
app.post("/books", (req, res) => {
    const { title, author, category, publication_year, description, price } = req.body;

    // Validation basique
    if (!title || !author || !category) {
        return res.status(400).json({ error: "Les champs titre, auteur et catégorie sont obligatoires" });
    }

    const query = "INSERT INTO books (title, author, category, publication_year, description, price) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [title, author, category, publication_year, description, price], (err, result) => {
        if (err) {
            console.error("Erreur lors de l'ajout du livre :", err);
            res.status(500).json({ error: "Erreur serveur" });
        } else {
            res.status(201).json({
                id: result.insertId,
                message: "Livre ajouté avec succès"
            });
        }
    });
});

// Mettre à jour un livre
app.put("/books/:id", (req, res) => {
    const id = req.params.id;
    const { title, author, category, publication_year, description, price } = req.body;

    // Validation basique
    if (!title || !author || !category) {
        return res.status(400).json({ error: "Les champs titre, auteur et catégorie sont obligatoires" });
    }

    const query = "UPDATE books SET title = ?, author = ?, category = ?, publication_year = ?, description = ?, price = ? WHERE id = ?";
    db.query(query, [title, author, category, publication_year, description, price, id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la mise à jour du livre :", err);
            res.status(500).json({ error: "Erreur serveur" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: "Livre non trouvé" });
        } else {
            res.json({ message: "Livre mis à jour avec succès" });
        }
    });
});

// Supprimer un livre
app.delete("/books/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Erreur lors de la suppression du livre :", err);
            res.status(500).json({ error: "Erreur serveur" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: "Livre non trouvé" });
        } else {
            res.json({ message: "Livre supprimé avec succès" });
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});