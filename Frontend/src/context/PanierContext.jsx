import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";
import { useAuth } from "./AuthContext";

// Création du contexte du panier
const PanierContext = createContext(null);

const PanierProvider = ({ children }) => {
    const { utilisateur, chargement: chargementAuth } = useAuth();

    // Stockage des produits du panier
    const [articles, setArticles] = useState([]);

    // État de chargement du panier
    const [chargement, setChargement] = useState(true);
    // Identifie le panier dont le chargement est terminé
    const [cleChargee, setCleChargee] = useState(null);

    // Clé de stockage propre à chaque utilisateur
    const cleStockage = utilisateur ? `panier_${utilisateur.id}` : null;

    // exécute la restauration lorsque l'utilisateur est connu
    useEffect(() => {
        // Attendre la restauration de la session utilisateur
        if (chargementAuth) {
            return;
        }

        // Si aucun client n'est connecté, réinitialiser le panier
        if (!cleStockage) {
            setArticles([]);
            setCleChargee(null);
            setChargement(false);
            return;
        }
        // Signaler le début du chargement du nouveau panier
        setChargement(true);

        try {
            const panierSauvegarde = localStorage.getItem(cleStockage);

            if (panierSauvegarde) {
                const donnees = JSON.parse(panierSauvegarde);

                if (Array.isArray(donnees)) {
                    setArticles(donnees);
                } else {
                    setArticles([]);
                }
            } else {
                setArticles([]);
            }
        } catch (error) {
            console.error("Erreur de restauration du panier :", error);
            setArticles([]);
        } finally {
            setCleChargee(cleStockage);
            setChargement(false);
        }
    }, [cleStockage, chargementAuth]);

    // Sauvegarder automatiquement les modifications du panier
    useEffect(() => {
        // Ne pas sauvegarder avant la fin de la restauration
        if (!cleStockage || cleChargee !== cleStockage || chargementAuth) {
            return;
        }

        localStorage.setItem(cleStockage, JSON.stringify(articles));
    }, [articles, cleStockage, cleChargee, chargementAuth]);

    // Ajouter un produit au panier
    const ajouterAuPanier = useCallback((produit) => {
        // Vérifier que le produit est disponible
        if (!produit || produit.stock <= 0) {
            return;
        }
        setArticles((anciensArticles) => {
            // Rechercher si le produit existe déjà dans le panier
            const articleExistant = anciensArticles.find(
                (article) => article.id === produit.id,
            );

            // Si le produit existe déjà, augmenter sa quantité
            if (articleExistant) {
                return anciensArticles.map((article) =>
                    article.id === produit.id
                        ? {
                              ...article,
                              quantite:
                                  article.quantite < produit.stock
                                      ? article.quantite + 1
                                      : article.quantite,
                          }
                        : article,
                );
            }

            // Sinon, ajouter le produit avec une quantité initiale de 1
            return [
                ...anciensArticles,
                {
                    ...produit,
                    quantite: 1,
                },
            ];
        });
    }, []);

    // Diminuer la quantité d'un produit
    const diminuerQuantite = useCallback((id) => {
        setArticles((anciensArticles) =>
            anciensArticles
                .map((article) =>
                    article.id === id
                        ? {
                              ...article,
                              quantite: article.quantite - 1,
                          }
                        : article,
                )
                .filter((article) => article.quantite > 0),
        );
    }, []);

    // Supprimer un produit du panier
    const supprimerDuPanier = useCallback((id) => {
        setArticles((anciensArticles) =>
            anciensArticles.filter((article) => article.id !== id),
        );
    }, []);

    // Vider complètement le panier
    const viderPanier = useCallback(() => {
        setArticles([]);
    }, []);

    // Calculer le nombre total d'articles
    const totalArticles = useMemo(() => {
        return articles.reduce((total, article) => total + article.quantite, 0);
    }, [articles]);

    // Calculer le prix total du panier
    const totalPrix = useMemo(() => {
        return articles.reduce(
            (total, article) => total + Number(article.prix) * article.quantite,
            0,
        );
    }, [articles]);

    // Regrouper les données et fonctions du panier
    const value = useMemo(
        () => ({
            articles,
            chargement,
            totalArticles,
            totalPrix,
            ajouterAuPanier,
            diminuerQuantite,
            supprimerDuPanier,
            viderPanier,
        }),
        [
            articles,
            chargement,
            totalArticles,
            totalPrix,
            ajouterAuPanier,
            diminuerQuantite,
            supprimerDuPanier,
            viderPanier,
        ],
    );

    // Rendre le panier accessible aux composants enfants
    return (
        <PanierContext.Provider value={value}>
            {children}
        </PanierContext.Provider>
    );
};
export default PanierProvider;

// Hook personnalisé pour utiliser le panier
export function usePanier() {
    const context = useContext(PanierContext);
    if (!context) {
        throw new Error(
            "usePanier doit être utilisé à l'intérieur de <PanierProvider>",
        );
    }
    return context;
}
