import { useEffect, useMemo, useState } from "react";
import styles from "./ListeProduit.module.css";
import { Link } from "react-router";
import Bouton from "../../../components/common/Bouton";

function Catalogue() {
    const [produits, setProduits] = useState([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState("");
    const [recherche, setRecherche] = useState("");

    // Récupération des produits depuis l'API
    const rechargeProduit = async () => {
        try {
            setErreur("");

            const reponse = await fetch("/api/produits");

            if (!reponse.ok) {
                throw new Error("Impossible de récupérer les produits.");
            }

            const donnees = await reponse.json();
            setProduits(donnees);
        } catch (err) {
            console.error("Erreur lors du chargement des produits :", err);
            setErreur(err.message || "Une erreur est survenue.");
        }
        setChargement(false);
    };

    // Recherche des produits par leur nom
    const produitsFiltres = useMemo(() => {
        return produits.filter((produit) =>
            produit.nom.toLowerCase().includes(recherche.toLowerCase()),
        );
    }, [produits, recherche]);

    // Chargement initial et actualisation automatique
    useEffect(() => {
        rechargeProduit();
    }, []);

    return (
        <main className={styles.page}>
            <section className={styles.carte}>
                <div className={styles.entete}>
                    <div className={styles.introduction}>
                        <h1>Liste des produits</h1>
                        <p>
                            Consultez les produits enregistrés dans votre
                            boutique.
                        </p>

                        {/* Champ de recherche */}
                        <div className={styles.rechercheConteneur}>
                            <span className={styles.iconeRecherche}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                            </span>
                            <input
                                type="search"
                                className={styles.champRecherche}
                                placeholder="Rechercher un produit..."
                                value={recherche}
                                onChange={(e) => setRecherche(e.target.value)}
                            />
                            {recherche && (
                                <Bouton  type="button"
                                    className={styles.effacerRecherche}
                                    onClick={() => setRecherche("")}
                                    aria-label="Effacer la recherche">
                                         ×
                                </Bouton>
                            )}
                        </div>
                    </div>
                    <div className={styles.actionsEntete}>
                        <Link to="/produits" className={styles.lienBouton}>
                            + Enregistrer un produit
                        </Link>
                    </div>
                </div>
                {erreur && (
                    <p className={styles.erreur} role="alert">
                        {erreur}
                    </p>
                )}
                {chargement ? (
                    <p className={styles.message}>Chargement des produits...</p>
                ) : !erreur && produitsFiltres.length === 0 ? (
                    <p className={styles.message}>
                        {recherche
                            ? "Aucun produit ne correspond à votre recherche."
                            : "Aucun produit enregistré."}
                    </p>
                ) : (
                    !erreur && (
                        <div className={styles.tableauConteneur}>
                            <table className={styles.tableau}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Produit</th>
                                        <th>Description</th>
                                        <th>Catégorie</th>
                                        <th>Prix</th>
                                        <th>Stock</th>
                                        <th>Date de création</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {produitsFiltres.map((produit) => (
                                        <tr key={produit.id}>
                                            <td>{produit.id}</td>
                                            <td className={styles.nomProduit}>
                                                {produit.nom}
                                            </td>
                                            <td>
                                                {produit.description || "—"}
                                            </td>
                                            <td>{produit.categorie || "—"}</td>
                                            <td className={styles.prix}>
                                                {Number(
                                                    produit.prix,
                                                ).toLocaleString("fr-FR", {
                                                    style: "currency",
                                                    currency: "EUR",
                                                })}
                                            </td>
                                            <td>
                                                <span
                                                    className={
                                                        produit.stock > 0
                                                            ? styles.stockDisponible
                                                            : styles.stockEpuise
                                                    }
                                                >
                                                    {produit.stock}
                                                </span>
                                            </td>
                                            <td>
                                                {produit.cree_le
                                                    ? new Date(
                                                          produit.cree_le.replace(
                                                              " ",
                                                              "T",
                                                          ) + "Z",
                                                      ).toLocaleDateString(
                                                          "fr-FR",
                                                      )
                                                    : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </section>
        </main>
    );
}
export default Catalogue;
