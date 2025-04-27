import { Outlet } from "react-router-dom";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    );
};

export default MoviesPage;
