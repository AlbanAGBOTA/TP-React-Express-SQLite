
import { usePanier } from "../../../context/PanierContext";
import styles from "./Panier.module.css";

function Panier() {
    const {
        articles,
        chargement,
        totalArticles,
        totalPrix,
        diminuerQuantite,
        ajouterAuPanier,
        supprimerDuPanier,
        viderPanier,
    } = usePanier();

    // Formater les prix en euros
    const formaterPrix = (prix) =>
        Number(prix).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
        });

    return (
        <main className={styles.page}>
            <h1 className={styles.titre}>Mon panier</h1>

            {chargement ? (
                <p>Chargement du panier...</p>
            ) : articles.length === 0 ? (
                <p className={styles.messageVide}>
                    Votre panier est vide.
                </p>
            ) : (
                <>
                    <p className={styles.resume}>
                        Nombre total d'articles : {totalArticles}
                    </p>

                    <div className={styles.listeArticles}>
                        {articles.map((article) => (
                            <article
                                key={article.id}
                                className={styles.carteArticle}
                            >
                                <div className={styles.informations}>
                                    <h2 className={styles.nomProduit}>
                                        {article.nom}
                                    </h2>

                                    <p className={styles.prixUnitaire}>
                                        Prix unitaire : {formaterPrix(article.prix)}
                                    </p>

                                    <div className={styles.controlesQuantite}>
                                        <button
                                            type="button"
                                            className={styles.boutonQuantite}
                                            onClick={() =>
                                                diminuerQuantite(article.id)
                                            }
                                        >
                                            −
                                        </button>

                                        <span className={styles.quantite}>
                                            {article.quantite}
                                        </span>

                                        <button
                                            type="button"
                                            className={styles.boutonQuantite}
                                            onClick={() =>
                                                ajouterAuPanier(article)
                                            }
                                            disabled={
                                                article.quantite >= article.stock
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            type="button"
                                            className={styles.boutonSupprimer}
                                            onClick={() =>
                                                supprimerDuPanier(article.id)
                                            }
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>

                                <p className={styles.sousTotal}>
                                    {formaterPrix(
                                        Number(article.prix) * article.quantite
                                    )}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div className={styles.recapitulatif}>
                        <h2>Total du panier</h2>

                        <p className={styles.total}>
                            {formaterPrix(totalPrix)}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={styles.boutonVider}
                        onClick={viderPanier}
                    >
                        Vider le panier
                    </button>
                </>
            )}
        </main>
    );
}

export default Panier;
