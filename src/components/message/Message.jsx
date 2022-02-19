import "./_message.scss"

import { format } from 'timeago.js'

function Message({ message, own /*is message from user*/ }) {

    const timestamp = new Date(message.timestamp * 1000)
    console.log("ABCDEFU" + new Date(1645274504*1000).toString())

    return (
        <div className={own ? "message own" : "message"}>
            <div className="top">
                <img
                    className="img"
                    src="https://cdn.discordapp.com/avatars/471238565033148427/121f385ebe564b8441ec617ced1e5d4e.webp"
                    alt=""
                />
                <p className="username">John Doe</p>
                <p className="time">{format(timestamp, "fr_FR")}</p>
                
            </div>
            <div className="bottom">
                <p className="text">{message.text}</p>
            </div>
        </div>
    );
}

export default Message;