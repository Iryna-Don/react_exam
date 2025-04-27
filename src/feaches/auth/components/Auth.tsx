import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGuestSessionId, getRequestToken } from "../auth.api.service.ts";
import Button from "../../../components/button/Button.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/appHooks.ts";
import styles from './аuth.module.css';

const Auth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { requestToken, sessionId, loading, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (sessionId) navigate('/movies');
    }, [sessionId, navigate]);

    useEffect(() => {
        if (!requestToken && !sessionId) dispatch(getRequestToken());
    }, [dispatch, requestToken, sessionId]);

    const handleConfirmLogin = () => {
        window.location.href =
            `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173/auth/callback`;
    };
    const handleGuestLogin = () => {
        dispatch(getGuestSessionId());
    };

    return (
        <div className={styles.wrapper}>
            <h2>Login via TMDB or login as Guest without the ability to participate in the rating</h2>

            {loading && <p className={'loading'}>Loading your access key...</p>}
            {error   && <p className={'error'}>Error: {error}</p>}

            {requestToken && !sessionId && (
                <Button
                    title="Confirm login to TMDB"
                    func={handleConfirmLogin}
                    disabled={loading}
                />
            )}

            <Button
                title="Login as a Guest"
                func={handleGuestLogin}
                disabled={loading}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            />
        </div>
    );
};

export default Auth;
