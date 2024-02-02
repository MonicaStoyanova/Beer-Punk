import axios from 'axios';

import { BASIC_URL, Beer, REGEX_FORMATTED_QUERY } from '../utils/consts';


// Fetch beer suggestions based on the beer name
export const fetchBeerSuggestions = async (beerNameSearch: string): Promise<Beer[]> => {
    try {
        const formattedQuery = beerNameSearch.replace(REGEX_FORMATTED_QUERY, '_');
        const { data } = await axios.get<Beer[]>(`${BASIC_URL}?beer_name=${formattedQuery}`);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
