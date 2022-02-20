import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "preact/hooks";
import { api } from "../../../Utils/Common";
import "./_searchUser.scss"

function SearchUser({ user }) {

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

    return (
        <div className="user">
            <Avatar className="avatar" sx={{ width: 56, height: 56 }} src={"https://api.glowapp.eu/forest/assets/avatars/" + user.avatar} alt={user.username} />
            <div className="information">
                <div className="username">
                    {user.username}
                </div>
                {user.bio && (
                    <div className="bio">
                        {TextAbstract(user.bio, 50)}
                    </div>
                )}
            </div>
            {/* {isFollowing ? 
                (<Button className="followBtn" variant="">Unfollow</Button>)
            :
                (<Button onClick={props.btnClick} className="followBtn" variant="text">Follow</Button>)} */}
        </div>
    );
}

export default SearchUser;