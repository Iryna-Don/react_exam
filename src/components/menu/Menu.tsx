import styles from "../../feaches/movie/components/movieInfo/movieInfo.module.css";
import Button from "../button/Button.tsx";
import NavMenu from "./NavMenu.tsx";
import UserLogo from "../../feaches/user/components/userLogo/UserLogo.tsx";
import {useNavigate} from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <Button
                title="← Back"
                func={() => navigate(-1)}
            />
            <NavMenu/>
            <UserLogo/>
        </div>
    );
};

export default Menu;