import {useNavigate} from "react-router-dom";
import {authSliceActions} from "../auth/authSlice.ts";
import {userSliceActions} from "./userSlice.ts";
import {useAppDispatch} from "../../hooks/appHooks.ts";
import {movieSliceActions} from "../movie/movieSlice.ts";

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return () => {
        dispatch(authSliceActions.logout());
        dispatch(userSliceActions.logout());
        dispatch(movieSliceActions.setPage(1));

        localStorage.removeItem("guest_session_id");
        localStorage.removeItem("session_id");
        localStorage.removeItem("user");
        localStorage.removeItem("guest");

        navigate("/");
    };
};
