import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { DEBOUNCE_DELAY } from '../../utils/consts';
import { fetchBeerSuggestions, resetSuggestions } from '../../store/slices/beersSlice';

import styles from './SearchBar.module.css';

const SearchBar = () => {
    const [beerNameSearch, setBeerNameSearch] = useState<string>('');                    // state from the search bar user input

    const dispatch = useAppDispatch();

    useEffect(() => {
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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