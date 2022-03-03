import { Avatar } from "@mui/material";
import { useEffect, useState } from "preact/hooks";
import { api } from "../../Utils/Common";
import "./_conversations.scss"

function Conversation({ receiverId }) {

    const [convUser, setConvUser] = useState([])

    useEffect(async () => {        
        await api.get('/users/' + receiverId, {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setConvUser(res.data)
        }).catch(err => {
            console.log(err)
        })
        
    }, [])

    return (
        <div className="conversation">
            <Avatar className="img" src={"https://api.glowapp.eu/forest/assets/avatars/" + convUser.avatar} alt="" />
            <span className="name">{convUser.username}</span>
        </div>
    );
}

export default Conversation;