import "./_message.scss"

function Message({ own /*is message from user*/ }) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="top">
                <img
                    className="img"
                    src="https://cdn.discordapp.com/avatars/471238565033148427/121f385ebe564b8441ec617ced1e5d4e.webp"
                    alt=""
                />
                <p className="username">John Doe</p>
                <p className="time">20 minutes ago</p>
                
            </div>
            <div className="bottom">
                <p className="text">Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.</p>
            </div>
        </div>
    );
}

export default Message;