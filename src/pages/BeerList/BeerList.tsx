import { useEffect, useState } from "react";

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from "./BeerList.module.css";
import { BASIC_URL } from "../../services/api";
// defining what information there is in one beer. Should it be type or interface?
type Beer = {
    id: number
    name: string
    tagline: string
    first_brewed: string
    ph: number
    abv: number
    image_url: string
}

const BeerList = () => {
    const [allBeers, setAllBeers] = useState<Beer[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [selectedBeerId, setSelectedBeerId] = useState<number | null>(null);
    // the url should be a separate const 
    useEffect(() => {
        const fetchAllBeers = async () => {
            try {
                const { data } = await axios.get<Beer[]>(BASIC_URL);
                setAllBeers(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllBeers();
    }, []);

    useEffect(() => {
        const storedBeerId = localStorage.getItem('selectedBeerId');
        if (storedBeerId) {
            setSelectedBeerId(parseInt(storedBeerId));
        }
    }, []);
    useEffect(() => {
        localStorage.removeItem('selectedBeerId'); // Clear selection on refresh
        setSelectedBeerId(null); // Reset selectedBeerId state
    }, []);

    const resetSelection = () => {
        localStorage.removeItem('selectedBeerId');
        setSelectedBeerId(null);
    };

    const renderBackButton = () => {
        return selectedBeerId ? (
            <button onClick={resetSelection} className={styles.backButton}>
                Back to All Beers
            </button>
        ) : null;
    };
    const toggleFavorite = (id: number) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(id)) {
                return prevFavorites.filter(favoriteId => favoriteId !== id);
            } else {
                return [...prevFavorites, id];
            }
        });
    };
    const getBeerToDisplay = () => {
        if (selectedBeerId) {
            // Find the selected beer in allBeers
            return allBeers.filter(beer => beer.id === selectedBeerId);
        }
        // If no beer is selected, return all beers
        return allBeers;
    };

    const renderBeerCards = () => {
        const beersToDisplay = getBeerToDisplay();
        return beersToDisplay

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
                            icon={favorites.includes(beer.id) ? faStar : farStar}
                            onClick={() => toggleFavorite(beer.id)}
                            title={!favorites.includes(beer.id) ? "Add to favorites" : "Remove from favorites"}
                        />
                    </div>
                </div>
            ));
    };

    return (
        <div>
            {renderBackButton()}
            <div className={styles.cardContainer}>
                {renderBeerCards()}
            </div>
        </div>
    );
};

export default BeerList;