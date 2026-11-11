import styles from "./Accueil.module.css";

function Accueil() {
    return (
        <div className={styles.accueilContainer}>
            <div className={styles.accueilCard}>
                <h1>Bienvenue, connectez-vous pour accéder a votre espace !</h1>

                <p>Ravi de vous revoir sur votre espace personnel.</p>
            </div>
        </div>
    );
}

export default Accueil;
