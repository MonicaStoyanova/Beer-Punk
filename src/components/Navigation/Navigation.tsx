import { Link } from 'react-router-dom';
import { fetchRandomBeer } from "../../store/slices/beersSlice";
import { useAppDispatch } from "../../store/store";

import styles from "./Navigation.module.css";


const Navigation = () => {
    const dispatch = useAppDispatch();

    const fetchRandom = () => {
        dispatch(fetchRandomBeer());
    };
    return (
        <nav className={styles.navigationContainer}>
            <ul className={styles.navigationList}>
                <li><Link to="/favorite">Favorites</Link></li>
                <li><Link to="/random-beer"><button className={styles.randomBeer} onClick={fetchRandom}>Random Beer</button></Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
