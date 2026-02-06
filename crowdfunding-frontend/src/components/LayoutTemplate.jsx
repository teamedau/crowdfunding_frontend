import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";

function LayoutTemplate() {
    return (
        <div>
            <NavBar />
            <Outlet />
            <footer>Made by Viviana Castrillon</footer>
        </div>
    );
}

export default LayoutTemplate;