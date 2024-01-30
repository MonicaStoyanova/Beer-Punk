import { ChangeEvent, useEffect, useState } from 'react';
import { fetchBeerSuggestions } from '../../services/api';

import { Beer, DEBOUNCE_DELAY } from '../../utils/consts';

import styles from './SearchBar.module.css';


// what is the return type?
const SearchBar = () => {
    // state from the search bar input  
    const [beerNameSearch, setBeerNameSearch] = useState<string>(''); // <string> here is not needed
    // suggested beers state based on the user searching
    const [suggestions, setSuggestions] = useState<Beer[]>([]);
    // state for the  searched word on every few seconds where there is a keystroke
    const [debouncedBeerName, setDebouncedBeerName] = useState<string>(beerNameSearch); // <string> here is not needed since TS understands its going to be one due to the starting value given

    // function to capture user search input
    useEffect(() => {
        // https://dev.to/jeetvora331/javascript-debounce-easiest-explanation--29hc
        const handler = setTimeout(() => {
            setDebouncedBeerName(beerNameSearch);
        }, DEBOUNCE_DELAY); // Debounce delay, sets the typed word after half a second

        return () => {
            clearTimeout(handler); // resets the timer; every keystroke restarts that timer
        };
    }, [beerNameSearch]);

    // fetching data based on the user searched word
    useEffect(() => {
        const fetchData = async () => {
            if (debouncedBeerName) {
                const suggestions = await fetchBeerSuggestions(debouncedBeerName);
                setSuggestions(suggestions.map((beer) => ({ id: beer.id, name: beer.name })));
            } else {
                setSuggestions([]);
            }
        };

        fetchData();
    }, [debouncedBeerName]);


    const renderSuggestions = () => {

        return suggestions.map((suggestion) => (//(suggestion) :<Beer>
            <div key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.id)}>
                {suggestion.name}
            </div>
        ));
    };
    // if the user clicks on one of the suggestions, the selection is saved in local storage
    // TO DO: we should show info on that clicked suggestion
    const handleSuggestionClick = (beerId: number) => {
        localStorage.setItem('selectedBeerId', beerId.toString());


    };
    // if they click on other suggestion on the list it gets overwritten or if they continue to type it gets cleared
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        localStorage.removeItem('selectedBeerId'); // Clear the selection
        setBeerNameSearch(e.target.value);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                className={styles.textbox}
                placeholder="Search beer name"
                value={beerNameSearch}
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