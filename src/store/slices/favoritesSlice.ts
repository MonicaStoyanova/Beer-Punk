import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Beer } from "../../utils/consts";

interface FavoritesState {
    favorites: Beer[];
}
const savedFavorites = localStorage.getItem('favorites');
const initialState: FavoritesState = {
    favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Beer>) => {
            const index = state.favorites.findIndex(favorite => favorite.id === action.payload.id);
            if (index >= 0) {
                state.favorites.splice(index, 1); // Remove from favorites
            } else {
                state.favorites.push(action.payload); // Add to favorites
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;