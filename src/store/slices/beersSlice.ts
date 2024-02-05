import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASIC_URL, Beer, REGEX_FORMATTED_QUERY } from "../../utils/consts";

interface BeerState {
    allBeers: Beer[];
    suggestions: Beer[];
    randomBeer: Beer[];
}
const initialState: BeerState = {
    allBeers: [],
    suggestions: [],
    randomBeer: [],
};

export const fetchAllBeers = createAsyncThunk<Beer[], void, { rejectValue: Error }>(
    "beers/getAllBeers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<Beer[]>(BASIC_URL);
            return data;
        } catch (error) {
            return rejectWithValue(new Error('Could not fetch beers'));
        }
    }
);

export const fetchRandomBeer = createAsyncThunk<Beer[], void, { rejectValue: Error }>(
    "beer/getRandomBeer",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<Beer[]>(BASIC_URL + "/random");
            return data;
        } catch (error) {
            return rejectWithValue(new Error('Could not fetch random beer'));
        }
    }
);

export const fetchBeerSuggestions = createAsyncThunk<Beer[], string, { rejectValue: string }>(
    'beers/fetchBeerSuggestions',
    async (beerNameSearch, { rejectWithValue }) => {
        try {
            const formattedQuery = beerNameSearch.replace(REGEX_FORMATTED_QUERY, '_');
            const response = await axios.get<Beer[]>(`${BASIC_URL}?beer_name=${formattedQuery}`);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || 'Error fetching beer suggestions';
                return rejectWithValue(message);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
);

const beersSlice = createSlice({
    name: "beers",
    initialState,
    reducers: {
        updateSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },
        updateRandomBeer: (state, action) => {
            state.randomBeer = action.payload
        },

        resetRandomBeer: (state) => {
            state.randomBeer = initialState.randomBeer;
        },
        resetSuggestions: (state) => {
            state.suggestions = initialState.suggestions;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllBeers.fulfilled, (state, action) => {
            state.allBeers = action.payload ?? [];
        })
        builder.addCase(fetchRandomBeer.fulfilled, (state, action) => {
            state.randomBeer = action.payload ?? [];
        })
            .addCase(fetchBeerSuggestions.fulfilled, (state, action) => {
                state.suggestions = action.payload;
            })
            .addCase(fetchBeerSuggestions.rejected, (state, action) => {
                console.error('Fetch beer suggestions failed:', action.payload);
            });
    }
});

export const {
    updateSuggestions,
    updateRandomBeer,
    resetRandomBeer,
    resetSuggestions
} = beersSlice.actions;

export default beersSlice.reducer;