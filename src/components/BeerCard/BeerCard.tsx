import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './BeerCard.module.css';
import { Beer } from '../../utils/consts';

interface BeerCardProps {
    beer: Beer;
    isFavorite?: boolean; // Make isFavorite optional if not required in all uses
    toggleFavorite?: (beer: Beer) => void; // Also optional, based on usage
}

const BeerCard: React.FC<BeerCardProps> = ({ beer, isFavorite, toggleFavorite }) => {
    return (
        <div className={styles.card}>
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