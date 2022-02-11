import "./_chat.scss"
import NavBar from "../../components/navbar/NavBar"
import CentralPage from "./specificComponents/centralPage/CentralPage";
import LeftBar from "./specificComponents/leftbar/LeftBar";
import RightBar from "./specificComponents/rightBar/RightBar";

function Chat() {
    return (
        <>
            <NavBar />
            <div className="chatContainer">
                <LeftBar className="leftBar" />
                <CentralPage className="centralPage" />
                <RightBar className="rightBar" />
            </div>
        </>
        
            
    );
}

export default Chat;