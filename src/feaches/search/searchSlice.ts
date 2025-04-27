import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IMovie } from "../movie/models/movie/IMovie.ts";
import { searchMoviesByTitle } from "./search.api.service.ts";

type initialSearchSliceType = {
    selectedMovies: IMovie[] | [],
    loading: boolean;
    error: string | null;
    searchPage: number;
    totalSearchPages: number;
    searchQuery: string;
    status: boolean;
};

const initialSearchSlice: initialSearchSliceType = {
    selectedMovies: [],
    loading: false,
    error: '',
    searchPage: 1,
    totalSearchPages: 1,
    searchQuery: "",
    status: false,
};

export const searchSlice = createSlice({
    name: "searchSlice",
    initialState: initialSearchSlice,
    reducers: {
                setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSearchPage(state, action: PayloadAction<number>) {
            state.searchPage = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(searchMoviesByTitle.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = false;
            })
            .addCase(searchMoviesByTitle.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.selectedMovies = action.payload.results;
                state.totalSearchPages = action.payload.total_pages;
            })
            .addCase(searchMoviesByTitle.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
                state.error = action.payload || 'Error loading movies';
            })
});

export const searchSliceActions = {
    ...searchSlice.actions,
    searchMoviesByTitle,
};
