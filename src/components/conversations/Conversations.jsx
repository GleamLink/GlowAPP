import { Avatar } from "@mui/material";
import { useEffect, useState } from "preact/hooks";
import { api } from "../../Utils/Common";
import "./_conversations.scss"

function Conversation({ conv, user }) {

    const [convUser, setConvUser] = useState([])
    const [avatarUrl, setAvatarUrl] = useState("https://api.glowapp.eu/forest/assets/avatars/" + user.avatar)

    useEffect(() => {
        console.log(user, conv)
        const friendId = conv.members.find((m) => m !== user.id)
        console.log("F: " + friendId)
        
        api.get('/users/' + friendId, {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setConvUser(res.data)
        }).catch(err => {
            console.log(err)
        })
        
    }, [user, conv])

    return (
        <div className="conversation">
            <Avatar className="img" src={avatarUrl} alt="" />
            <span className="name">{convUser?.username}</span>
        </div>
    );
}

export default Conversation;