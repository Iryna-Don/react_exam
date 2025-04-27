import SearchBar from "../../feaches/search/components/SearchBar.tsx";
import GenreSelector from "../../feaches/genre/components/genreSelector/GenreSelector.tsx";
import UserLogo from "../../feaches/user/components/userLogo/UserLogo.tsx";
import styles from "./header.module.css";

const Header = () => {
    return (
        <div className={styles.header}>
            <GenreSelector/>
            <SearchBar/>
            <UserLogo/>
        </div>
    );
};

export default Header;