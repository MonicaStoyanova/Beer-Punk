import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { DEBOUNCE_DELAY } from '../../utils/consts';
import { fetchBeerSuggestions, resetSuggestions, updateSearchPerformed } from '../../store/slices/beersSlice';

import styles from './SearchBar.module.css';

const SearchBar = () => {
    const [beerNameSearch, setBeerNameSearch] = useState<string>('');
    const [searchAfterDebounce, setSearchAfterDebounce] = useState<string>(beerNameSearch);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchAfterDebounce(beerNameSearch);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(handler);
        };
    }, [beerNameSearch]);

    useEffect(() => {
        if (searchAfterDebounce) {
            dispatch(fetchBeerSuggestions(searchAfterDebounce));
            dispatch(updateSearchPerformed(true));
        } else {
            dispatch(resetSuggestions());
            dispatch(updateSearchPerformed(false)); // Reset searchPerformed when input is cleared
        }
    }, [searchAfterDebounce, dispatch]);

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