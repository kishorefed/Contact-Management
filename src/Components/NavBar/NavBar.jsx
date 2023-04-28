import React from "react";
import { Link } from "react-router-dom";

let NavBar = () => {
    return (
        <React.Fragment>
            <nav className = "navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <Link to ={'/'} className="navbar-brand">
                    <i className="fa fa-mobile text-warning me-2"/> Contact Manager</Link>
                </div>
            </nav>
        </React.Fragment>
    )
};
export default NavBar 