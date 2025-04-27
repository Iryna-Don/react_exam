import {createSlice} from '@reduxjs/toolkit';
import {IUserResponse} from './models/IUserResponse.ts';
import {getUserDetails, getUserInfo} from "./user.api.service.ts";

interface UserState {
    data: IUserResponse | null;
    details: IUserResponse | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null,
}

const initialState: UserState = {
    data: null,
    status: 'idle',
    error: null,
    details: null,

};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Error getUserInfo';
            })
            .addCase(getUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Error getUserDetails';
            })
    },
});

export const userSliceActions = {
    ...userSlice.actions,
    getUserInfo,getUserDetails,
};
