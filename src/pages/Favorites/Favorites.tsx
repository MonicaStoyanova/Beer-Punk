import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./Favorites.module.css"
import { Beer } from "../../utils/consts";

const Favorites = () => {
    const favorites: Beer[] = useSelector((state: RootState) => state.favorites.favorites);


    return (
        favorites
            .map((favorite) => (
                <div className={styles.card} key={favorite.id}>
                    <div className={styles.cardContent}>
                        <img src={favorite.image_url} alt={favorite.name} />
                        <h3>{favorite.name}</h3>
                        <p className={styles.tagline}>{favorite.tagline}</p>
                        <p>
                            Brewed in: <b>{favorite.first_brewed}</b>
                        </p>
                        <p>
                            <b>Ph: {favorite.ph}</b>
                        </p>
                        <p>
                            <b>Abv: {favorite.abv}</b>
                        </p>
                    </div>
                </div>
            )));
};

export default Favorites;
