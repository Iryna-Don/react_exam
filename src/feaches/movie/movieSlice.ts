import {IMovie} from "./models/movie/IMovie.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCast, getImages, getMovieById, getMovies, getVideos} from "./movie.api.service.ts";
import {IMovieDetails} from "./models/movie/IMovieDetails.ts";
import {IVideo} from "./models/video/IVideo.ts";
import {IBackdrop} from "./models/images/IBackdrop.ts";
import {ICast} from "./models/cast/ICast.ts";

type MovieStateType = {
    movies: IMovie[],
    loading: boolean,
    error: string | null,
    page: number,
    totalPages: number,
    selectedMovie: IMovie | null,
    fullInfoSelectedMovie: IMovieDetails | null,
    loadingMovie: boolean,
    errorMovie: string | null,
    vote_average: number,
    vote_count: number,
    userRating: {
        [movieId: number]: number,
    },
    videos: IVideo[],
    loadingVideos: boolean,
    errorVideos: string | null,
    backdrops: IBackdrop[],
    loadingImages: boolean,
    errorImages: string | null,
    cast:ICast[],
    loadingCast: boolean,
    errorCast: string | null,
}

const initialMovieState: MovieStateType = {
    movies: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    selectedMovie: null,
    fullInfoSelectedMovie: null,
    loadingMovie: false,
    errorMovie: null,
    vote_average: 0,
    vote_count: 0,
    userRating: JSON.parse(localStorage.getItem('userRatings') || '{}'),
    videos: [],
    loadingVideos: false,
    errorVideos: null,
    backdrops: [],
    loadingImages: false,
    errorImages: null,
    cast: [],
    loadingCast: false,
    errorCast: null,
}

export const movieSlice = createSlice({
    name: "movieSlice",
    initialState: initialMovieState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setSelectedMovie(state, action: PayloadAction<IMovie>) {
            state.selectedMovie = action.payload;
            state.vote_average = action.payload.vote_average;
            state.vote_count = action.payload.vote_count;
        },
        setUserRating: (state, action) => {
            const {movieId, rating} = action.payload;
            state.userRating[movieId] = rating;
            const savedRatings = JSON.parse(localStorage.getItem('userRatings') || '{}');
            savedRatings[movieId] = rating;
            localStorage.setItem('userRatings', JSON.stringify(savedRatings));
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error loading movies';
            })
            .addCase(getMovieById.pending, (state) => {
                state.loadingMovie = true;
                state.errorMovie = null;
            })
            .addCase(getMovieById.fulfilled, (state, action) => {
                state.loadingMovie = false;
                state.fullInfoSelectedMovie = action.payload;
            })
            .addCase(getMovieById.rejected, (state, action) => {
                state.loadingMovie = false;
                state.errorMovie = action.payload || 'Error movie by id';
            })
            .addCase(getVideos.pending, (state) => {
                state.loadingVideos = true;
                state.errorVideos = null;
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.loadingVideos = false;
                state.videos = action.payload.results;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.loadingVideos = false;
                state.errorVideos = action.payload || 'Error video';
            })
            .addCase(getImages.pending, (state) => {
                state.loadingImages = true;
                state.errorImages = null;
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.loadingImages = false;
                state.backdrops = action.payload.backdrops;
            })
            .addCase(getImages.rejected, (state, action) => {
                state.loadingImages = false;
                state.errorImages = action.payload || 'Error video';
            })
            .addCase(getCast.pending, (state) => {
                state.loadingCast = true;
                state.errorCast = null;
            })
            .addCase(getCast.fulfilled, (state, action) => {
                state.loadingCast = false;
                state.cast = action.payload.cast;
            })
            .addCase(getCast.rejected, (state, action) => {
                state.loadingCast = false;
                state.errorCast = action.payload || 'Error video';
            })
});

export const movieSliceActions = {
    ...movieSlice.actions,
    getMovies,
    getMovieById,
    getVideos,
    getImages,
    getCast
};
