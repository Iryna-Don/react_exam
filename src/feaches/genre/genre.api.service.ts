import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGenre } from "./components/models/IGenre.ts";
import {axiosInstance} from "../../axios/axiosInstance.ts";

export const getGenres = createAsyncThunk<
    IGenre[],
    void,
    { rejectValue: string }
>(
    'genre/getGenres',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get<{ genres: IGenre[] }>('genre/movie/list');
            return res.data.genres;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue('Failed to load genres');
        }
    }
);
