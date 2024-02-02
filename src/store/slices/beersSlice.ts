import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASIC_URL, Beer } from "../../utils/consts";

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
            return rejectWithValue(new Error('Could not fetch random beer'))
        }
    }
)

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllBeers.fulfilled, (state, action) => {
            state.allBeers = action.payload ?? [];
        });
        builder.addCase(fetchRandomBeer.fulfilled, (state, action) => {
            state.randomBeer = action.payload ?? [];
        });
    }
});

export const {
    updateSuggestions,
    updateRandomBeer,
    resetRandomBeer,
} = beersSlice.actions;

export default beersSlice.reducer;