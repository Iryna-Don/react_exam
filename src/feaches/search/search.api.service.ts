import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMoviesResponse } from "../movie/models/movie/IMoviesResponse.ts";
import {axiosInstance} from "../../axios/axiosInstance.ts";


export const searchMoviesByTitle = createAsyncThunk<
    IMoviesResponse,
    { query: string; page: number },
    { rejectValue: string }
>(
    'search/searchMoviesByTitle',
    async ({ query, page }, thunkAPI) => {
        try {
            const response = await axiosInstance.get<IMoviesResponse>(
                `search/movie?query=${query}&include_adult=false&page=${page}`
            );
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.error('Error searching movies:', error);
            return thunkAPI.rejectWithValue('Failed to search movies');
        }
    }
);

