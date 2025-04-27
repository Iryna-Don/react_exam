import {useEffect} from "react";
import {getUserDetails, getUserInfo} from "../../user.api.service.ts";
import {useLogout} from "../../logOut.ts";
import Button from "../../../../components/button/Button.tsx";
import styles from "./userLogo.module.css";
import {useAppDispatch, useAppSelector} from "../../../../hooks/appHooks.ts";

const UserLogo = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(store => store.user.data);
    const sessionId = localStorage.getItem('session_id');
    const logOut = useLogout();

    useEffect(() => {
        if (sessionId) {
            dispatch(getUserInfo({sessionId}));
        }
    }, [dispatch, sessionId]);

    useEffect(() => {
        if (sessionId) {
            dispatch(getUserInfo({sessionId}))
                .unwrap()
                .then(user => {
                    dispatch(getUserDetails({accountId: user.id}));
                });
        }
    }, [dispatch, sessionId]);

    const isGuest = !sessionId || !data?.username;

    const username = isGuest ? 'Guest' : data.username;
    const gravatarHash = data?.avatar?.gravatar?.hash;
    const gravatarUrl = gravatarHash
        ? `https://www.gravatar.com/avatar/${gravatarHash}?s=100&d=mp`
        : 'https://www.gravatar.com/avatar/?d=mp';

    const tmdbAvatarPath = data?.avatar?.tmdb?.avatar_path;
    const tmdbAvatarUrl = !isGuest && tmdbAvatarPath
        ? `https://www.themoviedb.org/t/p/w300${tmdbAvatarPath}`
        : gravatarUrl;

    return (
        <div className={'rowContainer'}>
            <Button
                title={isGuest ? 'Login' : 'Logout'}
                func={logOut}
            />
            <div className={styles.container}><img className={styles.img} src={tmdbAvatarUrl} alt="User Avatar"/>
                <p>{username}</p>
            </div>


        </div>
    );
};

export default UserLogo;
