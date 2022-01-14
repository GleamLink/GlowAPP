import React from "react";
import LeftBar from "../../components/leftbar/NavBar";
import "./_home.scss";

function Home() {
    return (
        <div className="home">
            <LeftBar />
            <div className="homePage">
                <h1 className="pageTitle">Welcome on GlowAPP !</h1>
            </div>
        </div>
    )
}

export default Home;