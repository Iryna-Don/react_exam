import {createAsyncThunk} from '@reduxjs/toolkit';
import {IMoviesResponse} from './models/movie/IMoviesResponse.ts';
import {axiosInstance} from "../../axios/axiosInstance.ts";
import {IVideoResponse} from "./models/video/IVildeoResponse.ts";
import {IMovieDetails} from "./models/movie/IMovieDetails.ts";
import {IImagesResponse} from "./models/images/IImagesResponse.ts";
import {ICastResponse} from "./models/cast/ICastResponse.ts";

export const getMovies = createAsyncThunk<
    IMoviesResponse,
    { page: number; selectedGenreId: number | null },
    { rejectValue: string }
>(
    'movie/getMovies',
    async ({ page, selectedGenreId }, thunkAPI) => {
        const genreQuery = selectedGenreId ? `&with_genres=${selectedGenreId}` : '';

        try {
            const response = await axiosInstance.get<IMoviesResponse>(
                `discover/movie?page=${page}${genreQuery}`
            );
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.error('Error loading movies:', error);
            return thunkAPI.rejectWithValue('Failed to load movies');
        }
    }
);

export const getMovieById = createAsyncThunk<
    IMovieDetails,
    string,
    { rejectValue: string }
>(
    'movie/getMovieById',
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get<IMovieDetails>(`movie/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error loading movie:', error);
            return thunkAPI.rejectWithValue('Failed to load movie');
        }
    }
);

export const getVideos = createAsyncThunk<
    IVideoResponse,
    number,
    { rejectValue: string }
>(
    'movie/getVideos',
    async (movieId, thunkAPI) => {
        try {
            const response = await axiosInstance.get<IVideoResponse>(
                `movie/${movieId}/videos`
            );
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.error('Error loading video:', error);
            return thunkAPI.rejectWithValue('Failed to load video');
        }
    }
);

export const getImages = createAsyncThunk<
    IImagesResponse,
    number,
    { rejectValue: string }
>(
    'movie/getImages',
    async (movieId, thunkAPI) => {
        try {
            const response = await axiosInstance.get<IImagesResponse>(
                `movie/${movieId}/images`
            );
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.error('Error loading images:', error);
            return thunkAPI.rejectWithValue('Failed to load images');
        }
    }
);

export const getCast = createAsyncThunk<
    ICastResponse,
    number,
    { rejectValue: string }
    >(
        "movie/getCast",
            async (movieId, thunkAPI) => {
                try {
                    const response = await axiosInstance.get<ICastResponse>(
                        `movie/${movieId}/credits`
                    );
                    return thunkAPI.fulfillWithValue(response.data);
                } catch (error) {
                    console.error('Error loading cast:', error);
                    return thunkAPI.rejectWithValue('Failed to load cast');
                }
            }
    );









