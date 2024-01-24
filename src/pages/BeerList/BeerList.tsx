import { useEffect, useState } from "react";

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from "./BeerList.module.css";
// defining what information there is in one beer
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
    const [allBeers, setAllBeers] = useState<Beer[]>([]); //advising the state of what one beer holds
    const [favorites, setFavorites] = useState<number[]>([]); // storing ids


    useEffect(() => {
        const fetchAllBeers = async () => {
            try {
                const { data } = await axios.get<Beer[]>(`https://api.punkapi.com/v2/beers`);
                setAllBeers(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllBeers();
    }, []);

    const toggleFavorite = (id: number) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(id)) {
                return prevFavorites.filter(favoriteId => favoriteId !== id);
            } else {
                return [...prevFavorites, id];
            }
        });
    };


    return (
        //  the card onclick should make a sound, try finding pouring sound
        // on hoover enlarge the card
        <div className={styles.cardContainer}>
            {allBeers.map((beer) => (
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
            ))}
        </div>
    );
};

export default BeerList;
