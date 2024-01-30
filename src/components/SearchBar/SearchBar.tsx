import { ChangeEvent, useEffect, useState } from 'react';
import { fetchBeerSuggestions } from '../../services/api';

import { Beer, DEBOUNCE_DELAY } from '../../utils/consts';

import styles from './SearchBar.module.css';


const SearchBar = () => {
    // state from the search bar input  
    const [beerNameSearch, setBeerNameSearch] = useState<string>(''); // <string> here can be omitted
    // suggested beers state based on the user searching
    const [suggestions, setSuggestions] = useState<Beer[]>([]);

    // function to capture user search input
    useEffect(() => {
        // https://dev.to/jeetvora331/javascript-debounce-easiest-explanation--29hc
        const handler = setTimeout(() => {
            setBeerNameSearch(beerNameSearch);
        }, DEBOUNCE_DELAY); // Debounce delay, sets the typed word after half a second

        return () => {
            clearTimeout(handler); // resets the timer; every keystroke restarts that timer
        };
    }, [beerNameSearch]);

    // fetching data based on the user searched word
    useEffect(() => {
        const fetchData = async () => {
            if (beerNameSearch) {
                const suggestions = await fetchBeerSuggestions(beerNameSearch);
                setSuggestions(suggestions);
            } else {
                setSuggestions([]);
            }
        };

        fetchData();
    }, [beerNameSearch]);


    const renderSuggestions = () => {
        return suggestions.map((suggestion) => (
            <div key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.name)}>
                {suggestion.name}
            </div>
        ));
    };
    // if the user clicks on one of the suggestions, the selection is saved in local storage
    // TO DO: we should show info on that clicked suggestion
    const handleSuggestionClick = (beerName: string) => {
        localStorage.setItem('selectedBeerName', beerName);


    };
    // if they click on other suggestion on the list it gets overwritten or if they continue to type it gets cleared
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        localStorage.removeItem('selectedBeerName'); // Clear the selection
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