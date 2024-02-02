import { createSlice } from "@reduxjs/toolkit";
import { Beer } from "../../utils/consts";

interface FavoritesState {
    favorites: Beer[];
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const index = state.favorites.findIndex(favorite => favorite.id === action.payload.id);
            if (index >= 0) {
                state.favorites.splice(index, 1); // Remove from favorites
            } else {
                state.favorites.push(action.payload); // Add to favorites
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;