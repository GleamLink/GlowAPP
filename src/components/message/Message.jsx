import "./_message.scss"
import { useEffect, useRef, useState } from "preact/hooks";

import { format } from 'timeago.js'
import { api } from '../../Utils/Common'
import { Avatar, Skeleton } from "@mui/material";

function Message({ message, own /*is message from user*/, currentChat, user, loading }) {

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

    if(loading) return (
        <div className={own ? "message own" : "message"}>
            <div className="top" style={{ position: "relative", marginBottom: "50px" }}>
                <Skeleton
                    animation="wave"
                    variant="circle"
                    width={40}
                    height={40}
                    className="img"
                    sx={{ marginRight: "10px" }}
                />
                <Skeleton width={100} />
                <Skeleton width={120} height={50} sx={{ position: "absolute", top: "50px" }} />
                
            </div>
        </div>
            
        
    )
    else return (
        <div className={own ? "message own" : "message"}>
            <div className="top">
                <Avatar
                    className="img"
                    src={"https://api.glowapp.eu/forest/assets/avatars/" + (own ? user.avatar : chatUser.avatar)}
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