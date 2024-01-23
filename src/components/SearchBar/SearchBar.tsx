import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchBar.module.css';

const SearchBar = () => {
    const [beerName, setBeerName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    /*  useEffect(() => {
          const fetchData = async () => {
              try {
                  const { data } = await axios.get(
                      // check with postman if this is valid request
                      // it is not
                      `https://api.punkapi.com/v2/beers?beer_name=${beerName}
                      `
                  );
  
                  setSuggestions(data.products);
              } catch (error) {
                  console.log(error);
              }
          };
  
          fetchData();
      }, [beerName]);
  */
    return (
        <div className={styles.container}>
            <input
                type="text"
                className={styles.textbox}
                placeholder="Search beer name"
                value={beerName}
                onChange={(e) => {
                    setBeerName(e.target.value);
                }}
            />
        </div>
    );
};

export default SearchBar;