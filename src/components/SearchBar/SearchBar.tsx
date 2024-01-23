import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchBar.module.css';

type BeerSuggestion = {
    id: number
}

const SearchBar = () => {
    const [beerName, setBeerName] = useState<string>('');
    const [suggestions, setSuggestions] = useState<BeerSuggestion[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (beerName) {
                try {
                    const { data } = await axios.get(
                        // check with postman if this is valid request
                        // it is not
                        `https://api.punkapi.com/v2/beers?beer_name=${beerName}
                      `
                    );

                    setSuggestions(data);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setSuggestions([]); // Reset suggestions if beerName is empty
            }
        };

        fetchData();
    }, [beerName]);
    // we should add regex to catch blank spaces and turn them into underscores as per documentation
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBeerName(e.target.value);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                className={styles.textbox}
                placeholder="Search beer name"
                value={beerName}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;