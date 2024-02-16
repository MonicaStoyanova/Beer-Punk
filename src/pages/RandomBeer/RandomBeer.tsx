import { useEffect } from "react";

import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { fetchRandomBeer, resetRandomBeer } from "../../store/slices/beersSlice";
import { useAppDispatch } from "../../store/store";
import sound from "../../assets/beer-open.mp3"
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { Beer } from "../../utils/consts";

import BeerCard from "../../components/BeerCard/BeerCard";

import styles from './RandomBeer.module.css'

const RandomBeer = () => {

    const { playAudio } = useAudioPlayer(sound);

    const randomBeer: Beer[] = useSelector((state: RootState) => state.beers.randomBeer);

    const renderBeerCard = () => {
        return (
            randomBeer.map(random => (
                <BeerCard key={random.id} beer={random} playAudio={playAudio} />
            ))
        );
    }
    return (
        <div className={styles.cardContainer}>
            {renderBeerCard()}
        </div>
    )
}

export default RandomBeer