import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { fetchBeerSuggestions, resetSuggestions, updateSearchPerformed } from '../../store/slices/beersSlice';
import useDebounce from '../../hooks/useDebounce';
import { DEBOUNCE_DELAY } from '../../utils/consts';

import styles from './SearchBar.module.css';

const SearchBar = () => {
    const [beerNameSearch, setBeerNameSearch] = useState<string>('');
    const debouncedSearchBeerName = useDebounce(beerNameSearch, DEBOUNCE_DELAY);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (debouncedSearchBeerName) {
            dispatch(fetchBeerSuggestions(debouncedSearchBeerName));
            dispatch(updateSearchPerformed(true));
        } else {
            dispatch(resetSuggestions());
            dispatch(updateSearchPerformed(false)); // Reset searchPerformed when input is cleared
        }
    }, [debouncedSearchBeerName, dispatch]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {  // handleInputChange is called with each keystroke, updating the beerNameSearch state with the current value of the input field.
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