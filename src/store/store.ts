
import { configureStore } from "@reduxjs/toolkit";

import beerPunkReducer from './slices/beerPunkSlice';
import favoritesReducer from './slices/favoritesSlice';
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        beerPunk: beerPunkReducer,
        favorites: favoritesReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch