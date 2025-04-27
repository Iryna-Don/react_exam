import {createSlice} from '@reduxjs/toolkit';
import {getGuestSessionId, getRequestToken} from './auth.api.service.ts';
import {getSessionId} from './auth.api.service.ts';

type AuthStateType = {
    requestToken: string | null;
    expiresAt: string | null;
    sessionId: string | null;
    loading: boolean;
    error: string | null;
};

const initialAuthState: AuthStateType = {
    requestToken: null,
    expiresAt: null,
    sessionId: localStorage.getItem('session_id'),
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialAuthState,

    reducers: {
        logout: (state) => {
            state.sessionId = null;
            localStorage.removeItem('session_id');
        },
    },

    extraReducers: builder =>
        builder
            .addCase(getRequestToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRequestToken.fulfilled, (state, action) => {
                state.loading = false;
                state.requestToken = action.payload.request_token;
                state.expiresAt = action.payload.expires_at;
            })
            .addCase(getRequestToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error getting token';
            })
            .addCase(getSessionId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSessionId.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionId = action.payload.session_id;
            })
            .addCase(getSessionId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error getting session_id';
            })
            .addCase(getGuestSessionId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGuestSessionId.fulfilled, (state, action) => {
                state.loading = false;
                state.sessionId = action.payload.guest_session_id;
                state.expiresAt = action.payload.expires_at;
            })
            .addCase(getGuestSessionId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Guest session error';
            })

});

export const authSliceActions = {
    ...authSlice.actions,
    getRequestToken,
    getSessionId,
    getGuestSessionId
};
