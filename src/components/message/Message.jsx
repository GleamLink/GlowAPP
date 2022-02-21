import "./_message.scss"
import { useEffect, useRef, useState } from "preact/hooks";

import { format } from 'timeago.js'
import { api } from '../../Utils/Common'
import { Avatar } from "@mui/material";

function Message({ message, own /*is message from user*/, currentChat, user }) {

    const [chatUser, setChatUser] = useState([])
    const [avatarUrl, setAvatarUrl] = useState('')

    const timestamp = new Date(message.timestamp * 1000)
    
    const receiverId = currentChat.members.find(
        member => member !== user.id
    )

    useEffect(async () => {
        await api.get('/users/' + receiverId, {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setChatUser(res.data)
            setAvatarUrl("https://api.glowapp.eu/forest/assets/avatars/" + res.data.avatar)
        })
        .catch(err => console.log(err))
    }, [receiverId])

    return (
        <div className={own ? "message own" : "message"}>
            <div className="top">
                <Avatar
                    className="img"
                    src={avatarUrl}
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