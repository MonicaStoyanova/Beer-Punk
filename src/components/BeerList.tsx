import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';



import styles from "./BeerList.module.css";

const BeerList = () => {
    const [allBeers, setAllBeers] = useState([]);

    useEffect(() => {
        const fetchAllBeers = async () => {
            try {
                const { data } = await axios.get(`https://api.punkapi.com/v2/beers`);

                setAllBeers(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllBeers();
    }, []);

    return (
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
                        <FontAwesomeIcon icon={farStar} style={{ color: "#FFD43B" }} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BeerList;
