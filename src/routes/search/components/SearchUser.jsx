import { Avatar, Button } from "@mui/material";
import { useState } from "preact/hooks";
import { api } from "../../../Utils/Common";
import "./_searchUser.scss"

function SearchUser(props) {

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

    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <div className="user">
            <Avatar className="avatar" sx={{ width: 56, height: 56 }} src={"https://api.glowapp.eu/forest/assets/avatars/" + props.avatarUri} alt={props.username} />
            <div className="information">
                <div className="username">
                    {props.username}
                </div>
                {props.bio && (
                    <div className="bio">
                        {TextAbstract(props.bio, 50)}
                    </div>
                )}
            </div>
            {isFollowing ? 
                (<Button className="followBtn" variant="">Unfollow</Button>)
            :
                (<Button onClick={props.btnClick} className="followBtn" variant="text">Follow</Button>)}
        </div>
    );
}

export default SearchUser;