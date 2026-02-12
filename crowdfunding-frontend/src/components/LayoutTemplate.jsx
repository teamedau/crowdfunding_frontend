import {Outlet} from "react-router-dom";
import NavBar from "./NavBar";
import "./LayoutTemplate.css";

function LayoutTemplate() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}

export default LayoutTemplate;