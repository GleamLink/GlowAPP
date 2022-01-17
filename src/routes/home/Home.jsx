import LeftBar from "../../components/navbar/NavBar";
import "./_home.scss";

// Material Icons
import CFriends from "../../components/cfriends/CFriends";

function Home() {
    return (
        <div className="home">
            <LeftBar />
            <div className="homePage">
                <h1 className="welcomeTitle">Welcome {"C3cemel"}</h1>
                <img src="src/assets/img/logo-transparant.png" alt="glowLogo" className="homeLogo" />
                <div className="friends">
                    {/* <p className="paragraphOnlineFriends">Online friends - 4</p> */}
                    <CFriends username="chronic" avatarUrl="https://cdn.discordapp.com/avatars/471238565033148427/121f385ebe564b8441ec617ced1e5d4e.webp" status="online" />
                    <CFriends username="SkyX" avatarUrl="https://cdn.discordapp.com/avatars/374872431090991106/2d68f66cd2dcd97e2632e84cbd927a84.webp" status="online" />
                    <CFriends username="Bramal" avatarUrl="https://cdn.discordapp.com/avatars/880908644982591568/7e3cd09a157ed3512fe6b3e4103caee6.webp" status="dnd" />
                    <CFriends username="pekinio_1020" avatarUrl="https://cdn.discordapp.com/avatars/481697177542852624/8b640250adeeb6ac17806b87bad23838.webp" status="online" />
                </div>
            </div>
        </div>
    )
}

export default Home;
