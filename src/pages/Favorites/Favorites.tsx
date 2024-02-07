import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";

import { Beer } from "../../utils/consts";

import BeerCard from "../../components/BeerCard/BeerCard";

import styles from './Favorites.module.css'
import { toggleFavorite } from "../../store/slices/favoritesSlice";

const Favorites = () => {
    const favorites: Beer[] = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useAppDispatch();

    const renderBeerCards = () => {
        return (
            favorites.map(favorite => (
                <BeerCard
                    key={favorite.id}
                    beer={favorite}
                    isFavorite={true}
                    toggleFavorite={() => dispatch(toggleFavorite(favorite))}
                />
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
