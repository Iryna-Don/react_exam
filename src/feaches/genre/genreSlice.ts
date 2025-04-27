import { createSlice } from '@reduxjs/toolkit';
import { IGenre } from "./components/models/IGenre.ts";
import { getGenres } from "./genre.api.service.ts";

type GenreStateType = {
    genres: IGenre[];
    loading: boolean;
    error: string | null;
    selectedGenreId: number | null;
};

const initialGenreSliceState: GenreStateType = {
    genres: [],
    loading: false,
    error: null,
    selectedGenreId: null,
};

export const genreSlice = createSlice({
    name: 'genreSlice',
    initialState: initialGenreSliceState,
    reducers: {
                setSelectedGenreId: (state, action) => {
            state.selectedGenreId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.genres = action.payload;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error getGenres';
            });
    },
});

export const genreSliceActions = {
    ...genreSlice.actions,
    getGenres,
};
