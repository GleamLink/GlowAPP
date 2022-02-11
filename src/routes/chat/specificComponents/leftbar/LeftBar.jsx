import { useEffect, useState } from "preact/hooks";
import { api, getUser } from "../../../../Utils/Common";
import UserObject from "../userObject/UserObject";

function LeftBar() {
    const [user, setUser] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        api.get('/users/@me', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setUser(res.data)
            setAvatarUrl("https://api.glowapp.eu/forest/assets/avatars/" + res.data.avatar)
        })
        console.log(user)
    }, [])

    return (
        <div className="leftBar">
            <UserObject user={user} avatarUrl={avatarUrl} />
        </div>
    );
}



export default LeftBar;