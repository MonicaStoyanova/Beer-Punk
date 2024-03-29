import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import beersReducer from './slices/beersSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
    reducer: {
        beers: beersReducer,
        favorites: favoritesReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch