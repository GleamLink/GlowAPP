import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "preact/hooks";
import { api } from "../../../Utils/Common";
import "./_searchUser.scss"

function SearchUser({ user, props }) {

    const TextAbstract = (text, length) => {
        if (text == null) {
            return "";
        }
        if (text.length <= length) {
            return text;
        }
        text = text.substring(0, length);
        const last = text.lastIndexOf(" ");
        text = text.substring(0, last);
        return text + "...";
    }

    const clickHandler = () => {
        api.get('/users/@me', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            console.log(user.id, res.data.id, user.id === res.data.id)
            if(user.id === res.data.id) return props.history.push("/profile")
            props.history.push("/profiles/" + user.id)
        })
    }

    return (
        <div className="userContainer" >
            <div className="userInfo" onClick={clickHandler}>
                <Avatar className="avatar" sx={{ width: 56, height: 56 }} src={user.avatar && "https://forest.glowapp.eu/assets/avatars/" + user.avatar} alt={user.username} />
                <div className="information">
                    <div className="username">
                        {user.username}
                    </div>
                    {user.bio && (
                        <div className="bio">
                            {TextAbstract(user.bio, 100)}
                        </div>
                    )}
                </div>
            </div>
            
        </div>
    );
}

export default SearchUser;