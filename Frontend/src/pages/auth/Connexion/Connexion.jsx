// import { useState } from "react";
// import styles from "./Connexion.module.css";
// import { useNavigate } from "react-router";
// import { useAuth } from "../../../context/AuthContext";
// import { emailValide, nonVide } from "../../../utils/validators";

// function Connexion() {
//     const [form, setForm] = useState({ email: "", password: "" });
//     const [erreur, setErreur] = useState("");
//     const [succes, setSucces] = useState(false);
//     const [erreurs, setErreurs] = useState({});

//     const { connecter } = useAuth();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//         // Efface l'erreur du champ lorsque l'utilisateur le modifie
//         setErreurs((prev) => {
//             const nouvellesErreurs = { ...prev };
//             delete nouvellesErreurs[name];
//             return nouvellesErreurs;
//         });
//         setErreur("");
//         setErreurs(false);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         //validation des deux champs
//         const nouvellesErreurs = {};

//         if (!emailValide(form.email)) {
//             nouvellesErreurs.email =
//                 "Veuillez saisir une adresse email valide.";
//         }
//         if (!nonVide(form.password)) {
//             nouvellesErreurs.password = "Le mot de passe est obligatoire";
//         }
//         setErreurs(nouvellesErreurs);

//         // Si au moins un champ est invalide, on arrête
//         if (Object.keys(nouvellesErreurs).length > 0) {
//             setErreur("");
//             setErreurs(false);
//             return;
//         }

//         try {
//             const resultat = await connecter(form.email, form.password);
//             if (!resultat.ok) {
//                 setErreur(resultat.message);
//                 setSucces(false);
//                 return;
//             }
//             setErreur("");
//             setErreurs({});
//             setSucces(true);

//             console.log("Utilisateur connecté !");

//             setForm({ email: "", password: "" });

//             // Redirection après connexion
//             navigate("/produit", { replace: true });
//         } catch (error) {
//             console.error("Erreur de connexion :", error);
//             setErreur(
//                 "Serveur injoignable. Vérifiez que le backend est démarré.",
//             );
//             setSucces(false);
//         }

//     };
//     return (
//         <div className={styles.connexionContainer}>
//             <div className={styles.connexionCard}>
//                 <header className={styles.cardHeader}>
//                     <h1>Connexion</h1>
//                     <p className={styles.subtitle}>
//                         Accédez à votre espace personnel
//                     </p>
//                 </header>

//                 {/* Retours utilisateur */}
//                 {erreur && <div className={styles.error}>{erreur}</div>}
//                 {succes && (
//                     <div className={styles.success}>
//                         Connexion réussie ! Bienvenue...
//                     </div>
//                 )}
//                 <form
//                     onSubmit={handleSubmit}
//                     noValidate
//                     className={styles.formulaire}
//                 >
//                     <div className={styles.champ}>
//                         <label htmlFor="email">Adresse mail</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={form.email}
//                             onChange={handleChange}
//                             placeholder="votre@email.com"
//                             className={styles.formInput}
//                             required
//                         />
//                         {erreurs.email && (
//                             <p className={styles.error}>{erreurs.email}</p>
//                         )}
//                     </div>

//                     <div className={styles.champ}>
//                         <label htmlFor="password">Mot de passe</label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={form.password}
//                             onChange={handleChange}
//                             placeholder="••••••••"
//                             className={styles.formInput}
//                             required
//                         />
//                         {erreurs.password && (
//                             <p className={styles.error}>{erreurs.password}</p>
//                         )}
//                     </div>

//                     <button type="submit" className={styles.btn}>
//                         Se connecter
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Connexion;

import { useState } from "react";
import styles from "./Connexion.module.css";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { emailValide, nonVide } from "../../../utils/validators";

function Connexion() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [erreur, setErreur] = useState("");
    const [succes, setSucces] = useState(false);
    const [erreurs, setErreurs] = useState({});

    const { connecter } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Effacer uniquement l'erreur du champ modifié
        setErreurs((prev) => {
            const nouvellesErreurs = { ...prev };
            delete nouvellesErreurs[name];
            return nouvellesErreurs;
        });

        setErreur("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation des deux champs
        const nouvellesErreurs = {};

        if (!emailValide(form.email)) {
            nouvellesErreurs.email =
                "Veuillez saisir une adresse email valide.";
        }

        if (!nonVide(form.password)) {
            nouvellesErreurs.password = "Le mot de passe est obligatoire";
        }

        setErreurs(nouvellesErreurs);

        // Arrêter si les champs sont invalides
        if (Object.keys(nouvellesErreurs).length > 0) {
            setErreur("");
            return;
        }

        try {
            const resultat = await connecter(form.email, form.password);

            if (!resultat.ok) {
                setErreur(resultat.message);
                setSucces(false);
                return;
            }

            setErreur("");
            setErreurs({});
            setSucces(true);

            console.log("Utilisateur connecté !");

            setForm({ email: "", password: "" });

            // Redirection selon le rôle
            if (resultat.role === "admin") {
                navigate("/admin/produits", { replace: true });
            } else {
                // En attendant la création de la page /catalogue
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);

            setErreur(
                "Serveur injoignable. Vérifiez que le backend est démarré.",
            );

            setSucces(false);
        }
    };

    return (
        <div className={styles.connexionContainer}>
            <div className={styles.connexionCard}>
                <header className={styles.cardHeader}>
                    <h1>Connexion</h1>
                    <p className={styles.subtitle}>
                        Accédez à votre espace personnel
                    </p>
                </header>

                {/* Retours utilisateur */}
                {erreur && <div className={styles.error}>{erreur}</div>}

                {succes && (
                    <div className={styles.success}>
                        Connexion réussie ! Bienvenue...
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className={styles.formulaire}
                >
                    <div className={styles.champ}>
                        <label htmlFor="email">Adresse mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            className={styles.formInput}
                            required
                        />

                        {erreurs.email && (
                            <p className={styles.error}>{erreurs.email}</p>
                        )}
                    </div>

                    <div className={styles.champ}>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className={styles.formInput}
                            required
                        />

                        {erreurs.password && (
                            <p className={styles.error}>{erreurs.password}</p>
                        )}
                    </div>

                    <button type="submit" className={styles.btn}>
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Connexion;
