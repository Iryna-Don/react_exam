import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {authSliceActions} from '../authSlice.ts';
import {useAppDispatch} from "../../../hooks/appHooks.ts";

const AuthCallback = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const requestToken = new URLSearchParams(location.search).get('request_token');

    useEffect(() => {
        if (!requestToken) return;
        dispatch(authSliceActions.getSessionId(requestToken))
            .unwrap()
            .then(() => {
                navigate('/movies');
            })
            .catch((err) => {
                console.error('Authorization failed:', err);
            });
    }, [dispatch, navigate, requestToken]);
    return <p>Authorization via TMDB...</p>;
};

export default AuthCallback;
