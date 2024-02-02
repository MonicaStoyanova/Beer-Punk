import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASIC_URL, Beer } from "../../utils/consts";

interface BeerState {
    allBeers: Beer[];
    suggestions: Beer[];
}
const initialState: BeerState = {
    allBeers: [],
    suggestions: [],
};

export const fetchAllBeers = createAsyncThunk<Beer[], void, { rejectValue: Error }>(
    "beerPunk/getAllBeers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<Beer[]>(BASIC_URL);
            return data;
        } catch (error) {
            return rejectWithValue(new Error('Could not fetch beers'));
        }
    }
);

const beerPunkSlice = createSlice({
    name: "beerPunk",
    initialState,
    reducers: {
        updateSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },
        resetBeers: (state) => {
            state.suggestions = initialState.suggestions;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllBeers.fulfilled, (state, action) => {
            state.allBeers = action.payload ?? [];
        });
    }
});

export const {
    updateSuggestions,
} = beerPunkSlice.actions;

export default beerPunkSlice.reducer;