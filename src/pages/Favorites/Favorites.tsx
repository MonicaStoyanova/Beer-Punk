import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";

import { Beer } from "../../utils/consts";
import { toggleFavorite } from "../../store/slices/favoritesSlice";

import sound from "../../assets/beer-open.mp3"
import useAudioPlayer from "../../hooks/useAudioPlayer";

import BeerCard from "../../components/BeerCard/BeerCard";

import styles from './Favorites.module.css'


const Favorites = () => {
    const favorites: Beer[] = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useAppDispatch();

    const { playAudio } = useAudioPlayer(sound);

    const renderBeerCards = () => {
        return (
            favorites.map(favorite => (
                <BeerCard
                    key={favorite.id}
                    beer={favorite}
                    playAudio={playAudio}
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
