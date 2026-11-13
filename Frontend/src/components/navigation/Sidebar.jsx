import { NavLink } from "react-router";
import styles from "./Sidebar.module.css";
import { useAuth } from "../../context/AuthContext";

function ColonneGauche() {
    const { utilisateur } = useAuth();

    return (
        <aside className={styles.sidebar}>
            <h2>Navigation</h2>

            <ul>
                <li>
                    <NavLink to="/">Accueil</NavLink>{" "}
                </li>
                <li>
                    <NavLink to="/catalogue">Catalogue</NavLink>{" "}
                </li>
                {utilisateur?.role === "client" && (
                    <li>
                        <NavLink to="/panier">Mon panier</NavLink>{" "}
                    </li>
                )}
                {utilisateur?.role === "admin" && (
                    <li>
                        <NavLink to="/admin/produits">
                            Administration
                        </NavLink>
                    </li>
                )}
            </ul>
        </aside>
    );
}
export default ColonneGauche;
