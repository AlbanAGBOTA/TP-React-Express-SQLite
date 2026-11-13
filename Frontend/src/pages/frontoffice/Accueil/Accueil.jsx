import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./Accueil.module.css";

function Accueil() {
    const [produits, setProduits] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        const chargerProduits = async () => {
            try {
                const reponse = await fetch("/api/produits");
                if (!reponse.ok) {
                    throw new Error("Impossible de récupérer les produits.");
                }
                const donnees = await reponse.json();
                setProduits(donnees.slice(0, 4));
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
        <main className={styles.accueil}>
            <section className={styles.hero}>
                <div className={styles.heroContenu}>
                    <span className={styles.surtitre}>
                        BIENVENUE CHEZ TECHSTORE
                    </span>

                    <h1>
                        Toute la technologie
                        <span> à portée de main.</span>
                    </h1>
                    <p>
                        Découvrez notre sélection de produits informatiques et
                        d'accessoires technologiques pour vous accompagner au
                        quotidien.
                    </p>
                    <Link to="/catalogue" className={styles.boutonCatalogue}>
                        Découvrir nos produits
                    </Link>
                </div>
                <div className={styles.heroVisuel}>
                    <div className={styles.cercle}></div>
                    <div className={styles.appareilPrincipal}>
                        <span>💻</span>
                        <p>TECHNOLOGIE</p>
                    </div>
                    <div className={styles.appareilSecondaire}>
                        <span>🎧</span>
                    </div>
                    <div className={styles.appareilTertiaire}>
                        <span>📱</span>
                    </div>
                </div>
            </section>

            {/* La section des produits sera ajoutée ici */}

            <section className={styles.sectionProduits}>
                <div className={styles.enteteSection}>
                    <div>
                        <span className={styles.surtitreSection}>
                            NOTRE SÉLECTION
                        </span>
                        <h2>Nos produits</h2>
                        <p>
                            Découvrez quelques produits disponibles chez
                            TechStore.
                        </p>
                    </div>

                    <Link to="/catalogue" className={styles.lienCatalogue}>
                        Voir tout le catalogue →
                    </Link>
                </div>

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
                    <div className={styles.grilleProduits}>
                        {produits.map((produit) => (
                            <article
                                key={produit.id}
                                className={styles.carteProduit}
                            >
                                <div className={styles.imageProduit}>
                                    <img
                                        src={
                                            produit.image_url &&
                                            (produit.image_url.startsWith(
                                                "/",
                                            ) ||
                                                produit.image_url.startsWith(
                                                    "http",
                                                ))
                                                ? produit.image_url
                                                : "/images/produit-par-defaut.svg"
                                        }
                                        alt={produit.nom}
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "/images/produit-par-defaut.svg";
                                        }}
                                    />
                                </div>

                                <div className={styles.informationsProduit}>
                                    <span className={styles.categorieProduit}>
                                        {produit.categorie ||
                                            "Accessoire informatique"}
                                    </span>

                                    <h3>{produit.nom}</h3>

                                    <p className={styles.prixProduit}>
                                        {Number(produit.prix).toLocaleString(
                                            "fr-FR",
                                            {
                                                style: "currency",
                                                currency: "EUR",
                                            },
                                        )}
                                    </p>

                                    <p className={styles.stockProduit}>
                                        {produit.stock > 0
                                            ? "En stock"
                                            : "Indisponible"}
                                    </p>

                                    <Link
                                        to="/catalogue"
                                        className={styles.boutonProduit}
                                    >
                                        Découvrir
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
export default Accueil;
