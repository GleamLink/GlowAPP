import React from "react";
import LeftBar from "../../components/navbar/NavBar";
import StatusShower from "../../components/statusshower/StatusShower";
import "./_home.scss";

// Material Icons
import MessageIcon from '@material-ui/icons/Message';
import Friends from "../../components/friends/Friends";

function Home() {
    return (
        <div className="home">
            <LeftBar />
            <div className="homePage">
                <h1 className="welcomeTitle">Welcome {"C3cemel"}</h1>
                <img src="src/assets/img/logo-transparant.png" alt="g" className="homeLogo" />
                <div className="friends">
                    <Friends username="chronic" avatarUrl="https://cdn.discordapp.com/avatars/471238565033148427/121f385ebe564b8441ec617ced1e5d4e.webp" status="online" />
                    <Friends username="SkyX" avatarUrl="https://cdn.discordapp.com/avatars/374872431090991106/2d68f66cd2dcd97e2632e84cbd927a84.webp" status="online" />
                    <Friends username="Bramal" avatarUrl="https://cdn.discordapp.com/avatars/880908644982591568/7e3cd09a157ed3512fe6b3e4103caee6.webp" status="offline" />
                    <Friends username="pekinio_1020" avatarUrl="https://cdn.discordapp.com/avatars/481697177542852624/8b640250adeeb6ac17806b87bad23838.webp" status="offline" />
                    
                </div>
            </div>
        </div>
    )
}

export default Home;