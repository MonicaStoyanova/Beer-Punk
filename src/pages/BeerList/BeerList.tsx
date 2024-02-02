import { useEffect } from "react";

import { useSelector } from "react-redux";
import { toggleFavorite } from "../../store/slices/favoritesSlice";
import { useAppDispatch } from "../../store/store";
import { RootState } from "../../store/store";
import { fetchAllBeers } from "../../store/slices/beersSlice";

import BeerCard from "../../components/BeerCard/BeerCard";
import { Beer } from "../../utils/consts";

import styles from "./BeerList.module.css";

const BeerList = () => {
    const allBeers: Beer[] = useSelector((state: RootState) => state.beers.allBeers);
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllBeers())
    }, []);

    const renderBeerCards = () => {
        return allBeers.map(beer => (
            <BeerCard
                key={beer.id}
                beer={beer}
                isFavorite={favorites.some(favorite => favorite.id === beer.id)}
                toggleFavorite={() => dispatch(toggleFavorite(beer))}
            />
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