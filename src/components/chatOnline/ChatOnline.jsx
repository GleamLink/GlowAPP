import { useEffect, useRef, useState } from "preact/hooks";
import "./_chatonline.scss"

function ChatOnline({ onlineUsers, user, setCurrentChat }) {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])
    
    useEffect(() => {
        // const getFriend = 
    }, [])

    return (
        <div className="chatOnlineContainer">
            <div className="friend">
                <div className="imgContainer">
                    <img className="" src="https://cdn.discordapp.com/avatars/471238565033148427/121f385ebe564b8441ec617ced1e5d4e.webp" />
                    <div className="badge"></div>
                </div>
                <div className="username">{user.username}</div>
            </div>
        </div>
    );
}

export default ChatOnline;