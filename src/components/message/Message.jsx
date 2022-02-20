import "./_message.scss"
import { useEffect, useRef, useState } from "preact/hooks";

import { format } from 'timeago.js'
import { api } from '../../Utils/Common'

function Message({ message, own /*is message from user*/, currentChat, user }) {

    const [chatUser, setChatUser] = useState([])

    const timestamp = new Date(message.timestamp * 1000)
    
    const receiverId = currentChat.members.find(
        member => member !== user.id
    )

    useEffect(async () => {
        await api.get('/users/' + receiverId, {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => setChatUser(res.data))
        .catch(err => console.log(err))
    }, [receiverId])

    return (
        <div className={own ? "message own" : "message"}>
            <div className="top">
                <img
                    className="img"
                    src="https://cdn.discordapp.com/avatars/471238565033148427/121f385ebe564b8441ec617ced1e5d4e.webp"
                    alt=""
                />
                <p className="username">{own ? user.username : chatUser.username}</p>
                <p className="time">{format(timestamp, "fr_FR")}</p>
                
            </div>
            <div className="bottom">
                <p className="text">{message.text}</p>
            </div>
        </div>
    );
}

export default Message;