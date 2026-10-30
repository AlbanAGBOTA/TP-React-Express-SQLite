// import "./style.css";
import styles from "./Sidebar.module.css";
function ColonneGauche() {
    return (
        <aside className={styles.sidebar}>
            <h2>Catégorie</h2>
            <ul>
                <li>
                    <a href="">Clavier</a>
                </li>
                <li>
                    <a href="">Souri</a>
                </li>
                <li>
                    <a href="">Ecran</a>
                </li>
            </ul>
        </aside>
    );
}
export default ColonneGauche;
