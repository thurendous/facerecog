import React from "react";

const Navigation = ({ onRouteChange }) => {
    return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
            <p onClick={() => onRouteChange("signin")} className="po pa3 dim link f3 black underline pointer">
                Sign Out
            </p>
        </nav>
    );
}

export default Navigation;





