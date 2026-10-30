import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import styles from "./Menu.module.css";

function Menu() {
    const { utilisateur, estConnecte, deconnecter } = useAuth();
    const navigate = useNavigate();

    // Fonction de déconnexion
    const handleDeconnexion = () => {
        deconnecter();
        navigate("/connexion", { replace: true });
    };

    return (
        <nav className={styles.navBar}>
            {/* Liens de gauche (Accueil / Catalogue) */}
            <div className={styles.navLinks}>
                <NavLink
                    to="/"end
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.activeLink : ""}`
                    }
                >
                    Accueil
                </NavLink>

                <NavLink
                    to="/produit"
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.activeLink : ""}`
                    }
                >
                    Catalogue
                </NavLink>
                <NavLink
                    to="/panier"
                    className={({ isActive }) =>
                        `${styles.link} ${isActive ? styles.activeLink : ""}`
                    }
                >
                    Panier
                </NavLink>

                {estConnecte && (
                    <NavLink
                        to="/panier"
                        className={({ isActive }) =>
                            `${styles.link} ${isActive ? styles.activeLink : ""}`
                        }
                    >
                        Panier
                    </NavLink>
                )}
            </div>

            {/* Liens de droite (Selon l'état de connexion) */}
            <div className={styles.navLinks}>
                {!estConnecte ? (
                    <>
                        <NavLink
                            to="/connexion"
                            className={({ isActive }) =>
                                `${styles.link} ${isActive ? styles.activeLink : ""}`
                            }
                        >
                            Connexion
                        </NavLink>
                        <NavLink
                            to="/inscription"
                            className={({ isActive }) =>
                                `${styles.link} ${isActive ? styles.activeLink : ""}`
                            }
                        >
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
