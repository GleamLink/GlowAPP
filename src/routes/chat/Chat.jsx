import "./_chat.scss"
import NavBar from "../../components/navbar/NavBar"
import { useEffect, useState } from "preact/hooks";
import { api } from "../../Utils/Common";
import Conversation from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

function Chat() {

    const [user, setUser] = useState()
    const [avatarUrl, setAvatarUrl] = useState()

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        api.get('/users/@me', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setUser(res.data)
            setAvatarUrl("https://api.glowapp.eu/forest/assets/avatars/" + res.data.avatar)
        }).then(() => console.log(user))
    }, [!user])

    return (
        <>
            <NavBar />
            <div className="chatContainer">
                <div className="menu">
                    <div className="menuWrapper">
                        <input placeholder="Search..." className="searchInput" />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className="box">
                    <div className="boxWrapper">
                        <div className="chatBoxTop">
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea
                                className="chatInput"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="Send a message..."></textarea>
                            <button className="chatSubmit">Send</button>
                        </div>
                    </div>
                </div>
                <div className="online">
                    <div className="onlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
        
            
    );
}

export default Chat;