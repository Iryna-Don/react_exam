import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosInstance} from "../../axios/axiosInstance.ts";

export const getRequestToken = createAsyncThunk<
    { success: boolean; expires_at: string; request_token: string },
    void,
    { rejectValue: string }
>(
    'auth/getRequestToken',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get('authentication/token/new');
            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            console.error('Error getting request_token:', error);
            return thunkAPI.rejectWithValue('Failed to get request_token');
        }
    }
);

interface SessionResponse {
    session_id: string;
}

export const getSessionId = createAsyncThunk<
    SessionResponse,
    string,
    { rejectValue: string }
>(
    'auth/getSessionId',
    async (requestToken, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                'authentication/session/new',
                {request_token: requestToken}
            );
            const sessionId = response.data.session_id;
            localStorage.setItem('session_id', sessionId);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            console.error('Error creating session:', error);
            return thunkAPI.rejectWithValue('Failed to create session_id');
        }
    }
);

export const getGuestSessionId = createAsyncThunk<
    { guest_session_id: string; expires_at: string },
    void,
    { rejectValue: string }
>(
    'auth/getGuestSessionId',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get('authentication/guest_session/new');

            const guestSessionId = res.data.guest_session_id;
            localStorage.setItem('session_id', guestSessionId);
            localStorage.setItem('guest', 'true');

            return thunkAPI.fulfillWithValue(res.data);
        } catch (error) {
            console.error('Error creating guest session:', error);
            return thunkAPI.rejectWithValue('Failed to create guest session');
        }
    }
);

