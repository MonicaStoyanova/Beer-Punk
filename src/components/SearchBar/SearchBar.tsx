import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchBar.module.css';

type BeerSuggestion = {
    id: number,
    name: string
}

interface Beer {
    id: number;
    name: string
}

const SearchBar = () => {
    const [beerName, setBeerName] = useState<string>('');
    const [suggestions, setSuggestions] = useState<BeerSuggestion[]>([]);
    const [debouncedBeerName, setDebouncedBeerName] = useState(beerName);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedBeerName(beerName);
        }, 500); // Debounce delay

        return () => {
            clearTimeout(handler);
        };
    }, [beerName]);

    useEffect(() => {
        const fetchData = async () => {
            if (debouncedBeerName) {
                try {
                    const formattedQuery = debouncedBeerName.replace(/\s+/g, '_');
                    const { data } = await axios.get<Beer[]>(`https://api.punkapi.com/v2/beers?beer_name=${formattedQuery}`);
                    setSuggestions(data.map((beer) => ({ id: beer.id, name: beer.name })));
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchData();
    }, [debouncedBeerName]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBeerName(e.target.value);
    };

    const renderSuggestions = () => {
        return suggestions.map((suggestion) => (
            <div key={suggestion.id} onClick={() => setBeerName(suggestion.name)}>
                {suggestion.name}
            </div>
        ));
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
            {suggestions.length > 0 && (
                <div className={styles.suggestions}>
                    {renderSuggestions()}
                </div>
            )}
        </div>
    );
};

export default SearchBar;