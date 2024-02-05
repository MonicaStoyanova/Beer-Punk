import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { DEBOUNCE_DELAY } from '../../utils/consts';
import { fetchBeerSuggestions, resetSuggestions } from '../../store/slices/beersSlice';

import styles from './SearchBar.module.css';

const SearchBar = () => {
    const [beerNameSearch, setBeerNameSearch] = useState<string>('');                    // state from the search bar user input                         // suggested beers state based on the user searching

    const dispatch = useAppDispatch();

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

                dispatch(fetchBeerSuggestions(beerNameSearch));
            } else {
                dispatch(resetSuggestions());
            }
        };

        fetchData();
    }, [beerNameSearch]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {                     // if they click on other suggestion on the list it gets overwritten or if they continue to type it gets cleared
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
            /> </div>
    );
};

export default SearchBar;