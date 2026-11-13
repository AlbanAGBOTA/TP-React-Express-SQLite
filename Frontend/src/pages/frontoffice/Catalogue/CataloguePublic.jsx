import { useEffect, useState } from "react";
// import styles from "./Catalogue.module.css";
import styles from "./CataloguePublic.module.css";
import { usePanier } from "../../../context/PanierContext";

function CataloguePublic() {
    const [produits, setProduits] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");
    const {ajouterAuPanier } = usePanier();

    // Récupération des produits depuis l'API
    useEffect(() => {
        const chargerProduits = async () => {
            try {
                const reponse = await fetch("/api/produits");

                if (!reponse.ok) {
                    throw new Error("Impossible de récupérer les produits.");
                }

                const donnees = await reponse.json();
                setProduits(donnees);
            } catch (err) {
                console.error("Erreur de chargement :", err);
                setErreur(err.message);
            } finally {
                setChargement(false);
            }
        };

        chargerProduits();
    }, []);

    return (
        <main className={styles.page}>
            <header className={styles.entete}>
                <h1>Notre catalogue</h1>
                <p>Découvrez tous nos produits informatiques.</p>
            </header>

            {chargement && (
                <p className={styles.message}>Chargement des produits...</p>
            )}

            {erreur && (
                <p className={styles.erreur} role="alert">
                    {erreur}
                </p>
            )}

            {!chargement && !erreur && produits.length === 0 && (
                <p className={styles.message}>
                    Aucun produit disponible pour le moment.
                </p>
            )}

            {!chargement && !erreur && produits.length > 0 && (
                <section className={styles.grille}>
                    {produits.map((produit) => (
                        <article key={produit.id} className={styles.carte}>
                            <div className={styles.imageConteneur}>
                                <img
                                    src={
                                        produit.image_url ||
                                        "/images/produit-par-defaut.svg"
                                    }
                                    alt={produit.nom}
                                    className={styles.image}
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "/images/produit-par-defaut.svg";
                                    }}
                                />
                            </div>

                            <div className={styles.informations}>
                                <p className={styles.categorie}>
                                    {produit.categorie || "Non catégorisé"}
                                </p>

                                <h2>{produit.nom}</h2>

                                <p className={styles.description}>
                                    {produit.description ||
                                        "Aucune description disponible."}
                                </p>

                                <p className={styles.prix}>
                                    {Number(produit.prix).toLocaleString(
                                        "fr-FR",
                                        {
                                            style: "currency",
                                            currency: "EUR",
                                        },
                                    )}
                                </p>

                                <p className={styles.stock}>
                                    {produit.stock > 0
                                        ? "En stock"
                                        : "Indisponible"}
                                </p>

                                <button
                                    type="button"
                                    disabled={produit.stock <= 0}
                                    className={styles.bouton}
                                    onClick={()=>ajouterAuPanier(produit)}
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        </article>
                    ))}
                </section>
            )}
        </main>
    );
}

export default CataloguePublic;
