import styles from "./Navigation.module.css"
const Navigation = () => {
    return (
        <nav className={styles.navigationContainer}>
            <ul className={styles.navigationList}>
                <li><a href="" />Favorite</li>
                <li><a href="" />Random Beer</li>
                <li><a href="" />Login</li>
            </ul>
        </nav>
    );
};

export default Navigation;
