import { useState } from "react";
import styles from "./Recherche.module.css";

function Recherche() {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Recherche effectuée pour :", query);
        // Traitement de la recherche ou appel API ici

        // Réinitialise le champ après la recherche
        setQuery("");
    };

    return (
        <div className={styles.rechercheContainer}>
            <div className={styles.rechercheCard}>
                <h1>Chercher un produit</h1>

                <form onSubmit={handleSubmit} className={styles.formulaire}>
                    <div className={styles.champ}>
                        <label htmlFor="search">Rechercher</label>
                        <div className={styles.inputGroup}>
                            <input
                                type="search"
                                id="search"
                                name="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Nom du produit, catégorie..."
                                className={styles.searchInput}
                                required
                            />
                            <button type="submit" className={styles.btn}>
                                Rechercher
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Recherche;
