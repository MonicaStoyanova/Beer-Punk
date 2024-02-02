
import { configureStore } from "@reduxjs/toolkit";

import beerPunkReducer from './slices/beerPunkSlice';
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        beerPunk: beerPunkReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch