import { ChangeEvent, useEffect, useState } from 'react';
import { fetchBeerSuggestions } from '../../services/api';

import { Beer, DEBOUNCE_DELAY } from '../../utils/consts';

import styles from './SearchBar.module.css';

const SearchBar = () => {
    const [beerNameSearch, setBeerNameSearch] = useState<string>('');                    // state from the search bar input  
    const [suggestions, setSuggestions] = useState<Beer[] | undefined>();                          // suggested beers state based on the user searching

    useEffect(() => {                                                                    // function to capture and set user search input, based on: https://dev.to/jeetvora331/javascript-debounce-easiest-explanation--29hc
        const handler = setTimeout(() => {
            setBeerNameSearch(beerNameSearch);
        }, DEBOUNCE_DELAY);                                                              // Debounce delay, sets the typed word after half a second

        return () => {
            clearTimeout(handler);                                                       // resets the timer; every keystroke restarts that timer
        };
    }, [beerNameSearch]);

    useEffect(() => {                                                                    // fetching data based on the user searched word
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
        return suggestions?.map((suggestion) => (
            <div key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.name)}>
                {suggestion.name}
            </div>
        ));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {                     // if they click on other suggestion on the list it gets overwritten or if they continue to type it gets cleared
        localStorage.removeItem('selectedBeerName');                                      // Clear the previous selection
        setBeerNameSearch(e.target.value);
    };

    const handleSuggestionClick = (beerName: string) => {                                 // if the user clicks on one of the suggestions, the selection is saved in local storage TO DO: we should show info on that clicked suggestion
        localStorage.setItem('selectedBeerName', beerName);
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                className={styles.textbox}
                placeholder="Search by beer name"
                value={beerNameSearch}
                onChange={handleInputChange}
            />
            {suggestions
                ? (suggestions.length > 0) && (
                    <div className={styles.suggestions}>
                        {renderSuggestions()}
                    </div>
                )
                : null}

        </div>
    );
};

export default SearchBar;