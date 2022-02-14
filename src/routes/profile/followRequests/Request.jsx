import "./_request.scss"

function Request({username}) {
    return (
        <div className="user">
            <p>{username}</p>
        </div>
    );
}

export default Request;