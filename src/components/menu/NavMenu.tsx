import {Link} from "react-router-dom";
import "./navMenu.css";

const NavMenu = () => {
    return (
        <div className="rowContainer">
            <ul>
                <li>
                    <Link to={"/movies"}>Movies</Link>
                </li>
            </ul>

        </div>
    );
};

export default NavMenu;