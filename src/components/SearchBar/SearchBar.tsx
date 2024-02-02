import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { fetchBeerSuggestions } from '../../services/api';
import { Beer, DEBOUNCE_DELAY } from '../../utils/consts';
import { updateSuggestions } from '../../store/slices/beersSlice';

import styles from './SearchBar.module.css';


const SearchBar = () => {
    const [beerNameSearch, setBeerNameSearch] = useState<string>('');                    // state from the search bar user input  
    //const [suggestions, setSuggestions] = useState<Beer[] | undefined>();                          // suggested beers state based on the user searching
    const { suggestions } = useSelector((state) => state.beers);

    const dispatch = useDispatch();

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
                dispatch(updateSuggestions(suggestions));


            } else {
                setSuggestions([]);
            }
        };

        fetchData();
    }, [beerNameSearch]);

    const renderSuggestions = () => {
        return suggestions?.map((suggestion) => (
            <div key={suggestion.id}>
                {suggestion.name}
            </div>
        ));
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {                     // if they click on other suggestion on the list it gets overwritten or if they continue to type it gets cleared
        // localStorage.removeItem('selectedBeerName');   
        // Clear the previous selection
        setBeerNameSearch(e.target.value);
    };


    return (
        <div className={styles.container}>
            <input
                name='search'
                type="text"
                className={styles.textbox}
                placeholder="Search by beer name"
                value={beerNameSearch}
                onChange={handleInputChange}
            />
            {/* those suggestions should be rendered in the beerlist in order what appears to change according to user input */}
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