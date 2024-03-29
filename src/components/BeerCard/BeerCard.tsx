import { Beer } from '../../utils/consts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import styles from './BeerCard.module.css';

interface BeerCardProps {
    beer: Beer;
    isFavorite?: boolean;
    playAudio?: () => void;
    toggleFavorite?: (beer: Beer) => void;
}

const BeerCard: React.FC<BeerCardProps> = ({ beer, isFavorite, toggleFavorite, playAudio }) => {

    return (
        <div className={styles.card} >
            <div className={styles.cardContent}>
                <img src={beer.image_url} alt={beer.name} onClick={playAudio} />
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
                <button className={styles.starIcon}>
                    <FontAwesomeIcon
                        icon={isFavorite ? faStar : farStar}
                        onClick={() => toggleFavorite && toggleFavorite(beer)}
                        title={!isFavorite ? "Add to favorites" : "Remove from favorites"}
                    />
                </button>
            )}
        </div>
    );
};

export default BeerCard;