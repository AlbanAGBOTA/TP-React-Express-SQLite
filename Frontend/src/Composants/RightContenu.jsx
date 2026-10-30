// import "./style.css";
import styles from "./RightContenu.module.css"
function ContenueDroite() {
    return (
        <aside className={styles["right-column"]}>
            <h2>Panier</h2>
            <p>2 article</p>
            <p>Total : 74</p>
        </aside>
    );
}
export default ContenueDroite;
