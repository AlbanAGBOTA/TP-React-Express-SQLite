import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
import styles from "./Inscription.module.css";
import { nettoyerNom, validerInscription } from "../utils/validators";
import Champs from "./Props/ChampProps";
import { Link } from "react-router";

// AJOUT NOM : liste des champs qui n'acceptent que des lettres
const CHAMPS_NOM = ["nom", "prenom"];

//Déclare le composant Inscription (une fonction qui renvoie du JSX)
function Inscription() {
    // Un seul état objet pour tous les champs du formulaire
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        confirmation: "",
        cgu: false,
    });

    // État du message d'erreur ("" = pas d'erreur)
    const [erreur, setErreur] = useState("");
    // État du succès : false au départ, true quand l'inscription a réussi
    const [succes, setSucces] = useState(false);
    // AJOUT VALIDATION (2/5) : état des erreurs par champ, par exemple { nom: "...", email: "..." }
    const [erreurs, setErreurs] = useState({});

    // AJOUT : crée une référence, vide (null) au départ
    // React y placera l'élément <input> du nom une fois affiché
    const nomRef = useRef(null);

    // AJOUT : s'exécute une seule fois, juste après le premier affichage
    // (le tableau de dépendances [] vide signifie « uniquement au montage »)
    useEffect(() => {
        // nomRef.current est l'élément <input> réel du DOM ; .focus() y place le curseur
        nomRef.current.focus();
    }, []);

    // Gestionnaire appelé à chaque modification d'un champ
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Valeur à enregistrer : booléen pour une checkbox, texte pour les autres champs
        let nouvelleValeur = type === "checkbox" ? checked : value;
        // Message à afficher sous le champ (undefined = aucun message)
        let messageChamps;

        // AJOUT NOM : pour le nom et le prénom, on retire les chiffres et caractères spéciaux
        if (CHAMPS_NOM.includes(name)) {
            const nettoye = nettoyerNom(value);
            // Si la valeur a changé, c'est qu'un caractère interdit a été tapé ou collé
            if (nettoye !== value) {
                messageChamps = "Chiffre et caractères spéciaux interdits.";
            }
            nouvelleValeur = nettoye;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: nouvelleValeur,
        }));
        // AJOUT VALIDATION (3/5) : efface l'erreur du champ dès que l'utilisateur le modifie
        // (ou affiche le message d'avertissement du nom et du prénom)
        setErreurs((prev) => {
            const nouvellesErreurs = { ...prev };
            if (messageChamps) {
                nouvellesErreurs[name] = messageChamps;
            } else {
                delete nouvellesErreurs[name];
            }
            return nouvellesErreurs;
        });
        console.log(e.target.name, e.target.value);
    };

    // Fonction appelée à l'envoi du formulaire ; async pour pouvoir utiliser await
    const handleSubmit = async (e) => {
        e.preventDefault();

        // AJOUT VALIDATION (4/5) : valide tous les champs avec validators.js
        const erreurForm = validerInscription(formData);
        // Enregistre les erreurs pour les afficher sous chaque champ
        setErreurs(erreurForm);
        if (Object.keys(erreurForm).length > 0) {
            setErreur("Veuillez corriger les erreurs dans le formulaire.");
            setSucces(false);
            // Arrête la fonction : aucune requête n'est envoyée au serveur
            return;
        }

        try {
            const res = await fetch("/api/inscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom: formData.nom,
                    prenom: formData.prenom,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const data = await res.json();

            if (!res.ok) {
                setErreur(data.message || "Erreur lors de l'inscription.");
                setSucces(false);
                return;
            }
            setErreur("");
            setSucces(true);

            // Réinitialisation du formulaire
            setFormData({
                nom: "",
                prenom: "",
                email: "",
                password: "",
                confirmation: "",
                cgu: false,
            });
        } catch {
            setErreur(
                "Serveur injoignable. Vérifiez que le serveur Node.js est bien lancé.",
            );
            setSucces(false);
        }
    };

    return (
        <div className={styles.inscription}>
            <h2>Formulaire d'inscription</h2>

            <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formulaire}>
                    <h1>Créer un compte</h1>

                    <div className={styles.champ}>
                        <Champs
                            label="nom"
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            className={styles.formInput}
                            onChange={handleChange}
                            ref={nomRef}
                            required
                        />
                        {/* AJOUT VALIDATION (5/5) : affiche le message d'erreur du champ s'il existe */}
                        {erreurs.nom && (
                            <p className={styles.error}>{erreurs.nom}</p>
                        )}
                    </div>

                    <div className={styles.champ}>
                        <Champs
                            label="prenom"
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            className={styles.formInput}
                            onChange={handleChange}
                            required
                        />
                        {/* AJOUT VALIDATION (5/5) */}
                        {erreurs.prenom && (
                            <p className={styles.error}>{erreurs.prenom}</p>
                        )}
                    </div>

                    <div className={styles.champ}>
                        <Champs
                            label="email"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            className={styles.formInput}
                            onChange={handleChange}
                            required
                        />
                        {/* AJOUT VALIDATION (5/5) */}
                        {erreurs.email && (
                            <p className={styles.error}>{erreurs.email}</p>
                        )}
                    </div>

                    <div className={styles.champ}>
                        <Champs
                            label="password"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            className={styles.formInput}
                            onChange={handleChange}
                            required
                        />
                        {/* AJOUT VALIDATION (5/5) */}
                        {erreurs.password && (
                            <p className={styles.error}>{erreurs.password}</p>
                        )}
                    </div>

                    <div className={styles.champ}>
                        <label htmlFor="confirmation">
                            Confirmer le mot de passe
                        </label>
                        <input
                            type="password"
                            id="confirmation"
                            name="confirmation"
                            value={formData.confirmation}
                            className={styles.formInput}
                            onChange={handleChange}
                            required
                        />
                        {/* AJOUT VALIDATION (5/5) */}
                        {erreurs.confirmation && (
                            <p className={styles.error}>
                                {erreurs.confirmation}
                            </p>
                        )}
                    </div>

                    <div className={`${styles.champ} ${styles.champCase}`}>
                        <input
                            type="checkbox"
                            id="cgu"
                            name="cgu"
                            checked={formData.cgu}
                            onChange={handleChange}
                        />
                        <label htmlFor="cgu">
                            J'accepte les conditions d'utilisation
                        </label>
                        {/* AJOUT VALIDATION (5/5) */}
                        {erreurs.cgu && (
                            <p className={styles.error}>{erreurs.cgu} </p>
                        )}
                    </div>

                    {erreur && <p className={styles.error}>{erreur}</p>}
                    {succes && (
                        <p className={styles.success}> Inscription réussie !</p>
                    )}

                    <div className={styles.champ}>
                        <button type="submit" className={styles.btn}>
                            S'inscrire
                        </button>
                    </div>
                    <p className={styles.lien}>
                        Déjà un compte ?{" "}
                        {/* <Link to="/connexion">Se connecter</Link> */}
                        <Link to="/connexion">Se connecter</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Inscription;
