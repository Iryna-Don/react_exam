import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../feaches/auth/authSlice.ts";
import {movieSlice} from "../feaches/movie/movieSlice.ts";
import {genreSlice} from "../feaches/genre/genreSlice.ts";
import {searchSlice} from "../feaches/search/searchSlice.ts";
import {userSlice} from "../feaches/user/userSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        movie: movieSlice.reducer,
        genre: genreSlice.reducer,
        search: searchSlice.reducer,
        user: userSlice.reducer,
    }
});

