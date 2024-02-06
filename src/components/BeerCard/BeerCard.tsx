import { Beer } from '../../utils/consts';
import sound from "../../assets/beer-open.mp3"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './BeerCard.module.css';
import { useEffect, useRef } from 'react';


interface BeerCardProps {
    beer: Beer;
    isFavorite?: boolean;
    toggleFavorite?: (beer: Beer) => void;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer, isFavorite, toggleFavorite }) => {

    const audioRef = useRef(new Audio(sound));

    useEffect(() => {
        return () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);
    const playAudio = () => {
        // If there's any audio playing, stop it before playing the new one
        if (!audioRef.current.paused) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        audioRef.current.play();
    };
    // const play = () => {
    //     new Audio(sound).play();
    // }

    return (
        <div className={styles.card} onClick={playAudio}>
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
            {isFavorite !== undefined && (
                <div className={styles.starIcon}>
                    <FontAwesomeIcon
                        icon={isFavorite ? faStar : farStar}
                        onClick={() => toggleFavorite && toggleFavorite(beer)}
                        title={!isFavorite ? "Add to favorites" : "Remove from favorites"}
                    />
                </div>
            )}
        </div>
    );
};

export default BeerCard;