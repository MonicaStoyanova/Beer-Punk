import { Link } from 'react-router-dom';

import styles from "./Navigation.module.css"
const Navigation = () => {
    return (
        <nav className={styles.navigationContainer}>
            <ul className={styles.navigationList}>
                <li><Link to="/favorite">Favorite</Link></li>
                <li><Link to="/random-beer">Random Beer</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
