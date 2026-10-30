// Importe la connexion à la base de données SQLite depuis db.js
// ("../" remonte d'un dossier : on sort de controllers/ pour atteindre la racine)
import { db } from "../db.js";

// Fonction exportée : appelée par la route POST /api/produits
// req = requête reçue du client, res = réponse à renvoyer au client
export function sauvegardeProduit(req, res) {
  // Récupère les informations du produit envoyées par le client
  // req.body contient les données reçues au format JSON
  const {
    nom,
    prix,
    description = "",
    categorie = "",
    stock = 0,
    image_url = "",
  } = req.body;

  // Crée un objet vide pour regrouper toutes les erreurs de validation
  const erreurs = {};

  // Vérifie que le nom existe, qu'il s'agit d'une chaîne de caractères
  // et qu'il ne contient pas uniquement des espaces
  if (typeof nom !== "string" || nom.trim() === "") {
    erreurs.nom = "Le nom du produit est obligatoire.";
  }

  // Vérifie que le prix est renseigné et qu'il s'agit d'un nombre positif ou nul
  if (
    prix === undefined ||
    prix === null ||
    prix === "" ||
    !Number.isFinite(Number(prix)) ||
    Number(prix) < 0
  ) {
    erreurs.prix = "Le prix doit être un nombre positif ou nul.";
  }

  // Vérifie que le stock est un entier positif ou nul
  if (stock === "" || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
    erreurs.stock = "Le stock doit être un entier positif ou nul.";
  }

  // Vérifie si l'objet erreurs contient au moins une erreur
  // Object.keys(erreurs) renvoie un tableau contenant les noms des propriétés
  // Si sa longueur est supérieure à 0, cela signifie qu'il existe des erreurs
  if (Object.keys(erreurs).length > 0) {
    // Renvoie le code HTTP 400 (requête incorrecte)
    // et transmet toutes les erreurs au client au format JSON
    return res.status(400).json({
      message: "Veuillez corriger les erreurs.",
      erreurs,
    });
  }

  try {
    // Prépare la requête SQL permettant d'enregistrer un nouveau produit
    // Les points d'interrogation (?) sont des paramètres remplacés par les valeurs
    // transmises à la méthode .run(), ce qui évite de concaténer directement les données
    const resultat = db
      .prepare(
        `
        INSERT INTO produits
          (nom, prix, description, categorie, stock, image_url, cree_le)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
      `,
      )
      // Exécute la requête et transmet les valeurs dans le même ordre
      .run(
        nom.trim(),
        Number(prix), // Le prix correspond à la deuxième colonne
        description, // La description correspond à la troisième colonne
        categorie,
        Number(stock),
        image_url,
      );

    // Récupère le produit qui vient d'être enregistré dans la base
    // lastInsertRowid correspond à l'identifiant généré automatiquement
    const produit = db
      .prepare(
        `
        SELECT id, nom, prix, description, categorie, stock, image_url, cree_le
        FROM produits
        WHERE id = ?
      `,
      )
      .get(Number(resultat.lastInsertRowid));

    // Renvoie le code HTTP 201 (ressource créée avec succès)
    // et transmet un message accompagné des informations du produit enregistré
    return res.status(201).json({
      message: "Produit créé avec succès.",
      produit,
    });
  } catch (err) {
    // Affiche les détails de l'erreur dans le terminal du serveur
    console.error("Erreur lors de l'enregistrement du produit :", err);

    // Renvoie le code HTTP 500 (erreur interne du serveur)
    return res.status(500).json({
      message: "Erreur serveur lors de l'enregistrement du produit.",
    });
  }
}

// Fonction exportée : appelée par la route GET /api/produits
// req = requête reçue (inutile ici), res = réponse à renvoyer au client

export function listerProduits(req, res) {
  try {
    // Prépare la requête SQL permettant de récupérer tous les produits
    // SELECT indique les colonnes à récupérer dans la table produits
    // ORDER BY nom trie les produits par ordre alphabétique de leur nom
    const produits = db
      .prepare(
        `
        SELECT id, nom, description, prix, categorie, stock, image_url, cree_le
        FROM produits
        ORDER BY nom
      `,
      )
      // .all() exécute la requête et renvoie toutes les lignes sous forme de tableau
      // Chaque ligne est représentée par un objet JavaScript
      .all();

    // Renvoie le code HTTP 200 (succès par défaut)
    // et transmet le tableau des produits au client au format JSON
    return res.status(200).json(produits);
  } catch (err) {
    // Affiche les détails de l'erreur dans le terminal du serveur
    console.error("Erreur lors de la récupération des produits :", err);

    // Renvoie le code HTTP 500 en cas d'erreur du serveur
    return res.status(500).json({
      message: "Erreur serveur lors de la récupération des produits.",
    });
  }
}
