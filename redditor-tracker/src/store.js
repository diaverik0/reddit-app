import { configureStore } from '@reduxjs/toolkit'
import searchResultsReducer from './slices/searchSlice';

export const store = configureStore({
    reducer:{
    searchResults: searchResultsReducer
    }
})