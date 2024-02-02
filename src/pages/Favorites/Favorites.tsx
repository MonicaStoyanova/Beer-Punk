import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { Beer } from "../../utils/consts";

import BeerCard from "../../components/BeerCard/BeerCard";

import styles from './Favorites.module.css'

const Favorites = () => {
    const favorites: Beer[] = useSelector((state: RootState) => state.favorites.favorites);

    const renderBeerCards = () => {
        return (
            favorites.map(favorite => (
                <BeerCard key={favorite.id} beer={favorite} />
            ))
        );
    }

    return (
        <div>
            <div className={styles.cardContainer}>
                {renderBeerCards()}
            </div>
        </div>
    );
};

export default Favorites;
