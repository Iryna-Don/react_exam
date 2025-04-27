import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserResponse } from "./models/IUserResponse.ts";
import { axiosInstance } from "../../axios/axiosInstance.ts";
import { RootState } from "../../hooks/appHooks.ts";

export const getUserInfo = createAsyncThunk<
    IUserResponse,
    { sessionId: string },
    { state: RootState; rejectValue: string }
>(
    'user/getUserInfo',
    async ({ sessionId }, thunkAPI) => {
        try {
            const response = await axiosInstance.get('account', {
                params: { session_id: sessionId },
            });
            return response.data;
        } catch (error) {
            console.error('Error getting user info:', error);
            return thunkAPI.rejectWithValue('Failed to load user data');
        }
    }
);

export const getUserDetails = createAsyncThunk<
    IUserResponse,
    { accountId: number },
    { rejectValue: string }
>(
    'user/getUserDetails',
    async ({ accountId }, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`account/${accountId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting user details:', error);
            return thunkAPI.rejectWithValue('Failed to load user details');
        }
    }
);

