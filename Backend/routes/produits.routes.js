// Importe Router depuis Express
// Router permet de créer des routes séparées du fichier principal du serveur
import { Router } from "express";

// Importe les fonctions du contrôleur qui gèrent les produits
// listerProduits : récupère la liste des produits
// sauvegardeProduit : enregistre un nouveau produit
import {
    listerProduits,
    sauvegardeProduit,
} from "../controllers/produits.controller.js";

// Crée une nouvelle instance de Router
const router = Router();

// Définit la route POST : elle permet d'enregistrer un nouveau produit
// "/" correspond au chemin de base défini dans le fichier principal du serveur
router.post("/", sauvegardeProduit);

// Définit la route GET : elle permet de récupérer tous les produits
router.get("/", listerProduits);

// Exporte le routeur pour qu'il puisse être utilisé dans le fichier principal du serveur
export default router;
