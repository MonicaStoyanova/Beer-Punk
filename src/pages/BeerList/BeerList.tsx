import { useEffect } from "react";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from "react-redux";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { useAppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { fetchAllBeers } from "../../store/slices/beerPunkSlice";
import { Beer } from "../../utils/consts";

import styles from "./BeerList.module.css";

const BeerList = () => {
    const allBeers: Beer[] = useSelector((state: RootState) => state.beerPunk.allBeers);
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllBeers())
    }, []);

    const renderBeerCards = () => {
        return allBeers
            .map((beer) => (
                <div className={styles.card} key={beer.id}>
                    <div className={styles.cardContent}>
                        <img src={beer.image_url} alt={beer.name} />
                        <h3>{beer.name}</h3>
                        <p className={styles.tagline}>{beer.tagline}</p>
                        <p>
                            Brewed in: <b>{beer.first_brewed}</b>
                        </p>
                        <p>
                            <b>Ph: {beer.ph}</b>
                        </p>
                        <p>
                            <b>Abv: {beer.abv}</b>
                        </p>
                    </div>
                    <div className={styles.starIcon}>
                        <FontAwesomeIcon
                            icon={favorites.some(favorite => favorite.id === beer.id) ? faStar : farStar}
                            onClick={() => dispatch(toggleFavorite(beer))}
                            title={!favorites.some(favorite => favorite.id === beer.id) ? "Add to favorites" : "Remove from favorites"}
                        />
                    </div>
                </div>
            ));
    };

    return (
        <div>

            <div className={styles.cardContainer}>
                {renderBeerCards()}
            </div>
        </div>
    );
};

export default BeerList;