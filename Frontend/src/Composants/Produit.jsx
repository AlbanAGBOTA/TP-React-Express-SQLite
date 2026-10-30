import { useState } from "react";
import Champs from "./Props/ChampProps";
import styles from "./Produit.module.css";
import Bouton from "./Bouton";
import { useNavigate } from "react-router";

function Produit() {
    const [formData, setFormData] = useState({
        nom: "",
        prix: "",
        description: "",
        categorie: "",
        stock: "",
        image: "",
    });

    const [erreur, setErreur] = useState("");
    const [succes, setSucces] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErreur("");
        setSucces(false);

        try {
            const res = await fetch("/api/produits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom: formData.nom,
                    description: formData.description,
                    prix: parseFloat(formData.prix),
                    stock: formData.stock ? parseInt(formData.stock) : 0,
                    categorie: formData.categorie,
                    image_url: formData.image,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErreur(
                    data.message ||
                        "Erreur lors de l'enregistrement du produit.",
                );
                setLoading(false);
                return;
            }

            // setSucces(true);
            // setFormData({
            //     nom: "",
            //     prix: "",
            //     description: "",
            //     categorie: "",
            //     stock: "",
            //     image: "",
            // });

            // Le produit a bien été enregistré dans la base de données.
            // On retourne à la liste des produits.
            navigate("/produit");

        } catch (err) {
            console.error(err);
            setErreur(
                "Serveur injoignable. Vérifiez que le backend est lancé.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.produitContainer}>
            <div className={styles.produitCard}>
                <h1>Enregistrer un produit</h1>

                {erreur && <div className={styles.error}>{erreur}</div>}
                {succes && (
                    <div className={styles.success}>
                        Produit enregistré avec succès !
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.formulaire}>
                    <div className={styles.champ}>
                        <Champs
                            label="Nom du produit"
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <div className={styles.champ}>
                        <Champs
                            label="Prix (€)"
                            type="number"
                            step="0.01"
                            id="prix"
                            name="prix"
                            value={formData.prix}
                            onChange={handleChange}
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <div className={styles.champ}>
                        <Champs
                            label="Description"
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                    </div>

                    <div className={styles.champ}>
                        <Champs
                            label="Catégorie"
                            type="text"
                            id="categorie"
                            name="categorie"
                            value={formData.categorie}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                    </div>

                    <div className={styles.champ}>
                        <Champs
                            label="Stock"
                            type="number"
                            id="stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                    </div>

                    <div className={styles.champ}>
                        <Champs
                            label="URL de l'image"
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className={styles.formInput}
                        />
                    </div>

                    <div className={styles.champBtn}>
                        <Bouton
                            type="submit"
                            className={styles.btn}
                            disabled={loading}
                        >
                            {loading ? "Enregistrement..." : "Enregistrer"}
                        </Bouton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Produit;
