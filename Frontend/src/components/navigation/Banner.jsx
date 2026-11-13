import Menu from "./Menu";
// import "./style.css";
import styles from "./Banner.module.css";
function Banner() {
    return (
        <>
            <header className={styles.banner}>
                <h1 className={styles.logo}>TechStore</h1>
                <Menu />
            </header>
        </>
    );
}
export default Banner;
