import { NavLink, useNavigate } from "react-router";
import styles from "./Menu.module.css";
import { useAuth } from "../../context/AuthContext";
import { usePanier } from "../../context/PanierContext";

function Menu() {
    const { utilisateur, estConnecte, deconnecter } = useAuth();
    const { totalArticles } = usePanier();
    const navigate = useNavigate();

    // Vérifier le rôle de l'utilisateur
    const estAdmin = utilisateur?.role === "admin";
    const estClient = utilisateur?.role === "client";

    // Fonction de déconnexion
    const handleDeconnexion = () => {
        deconnecter();
        navigate("/connexion", { replace: true });
    };

    // Classe CSS commune aux liens
    const classeLien = ({ isActive }) =>
        `${styles.link} ${isActive ? styles.activeLink : ""}`;

    return (
        <nav className={styles.navBar}>
            {/* Liens de gauche */}
            <div className={styles.navLinks}>
                <NavLink to="/" end className={classeLien}>
                    {" "}
                    Accueil{" "}
                </NavLink>
                {estAdmin ? (
                    <NavLink to="/admin/produits" className={classeLien}>
                        {" "}
                        Administration
                    </NavLink>
                ) : (
                    <NavLink to="/catalogue" className={classeLien}>
                        {" "}
                        Catalogue{" "}
                    </NavLink>
                )}

                {estClient && (
                    <NavLink to="/panier" className={classeLien}>
                        Panier ({totalArticles})
                    </NavLink>
                )}
            </div>

            {/* Liens de droite */}
            <div className={styles.navLinks}>
                {!estConnecte ? (
                    <>
                        <NavLink to="/connexion" className={classeLien}>
                            Connexion
                        </NavLink>

                        <NavLink to="/inscription" className={classeLien}>
                            Inscription
                        </NavLink>
                    </>
                ) : (
                    <>
                        <span className={styles.welcomeText}>
                            Bonjour,{" "}
                            <span className={styles.userName}>
                                {utilisateur?.prenom || "Utilisateur"}
                            </span>
                        </span>

                        <button
                            onClick={handleDeconnexion}
                            className={styles.logoutBtn}
                        >
                            Se déconnecter
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
export default Menu;
