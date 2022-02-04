import { useEffect, useState } from "preact/hooks";
import NavBar from "../../components/navbar/NavBar";
import { api, getUser } from "../../Utils/Common";
import './_profile.scss'

function Profile() {

    const [user, setUser] = useState()

    useEffect(() => {
        api.get('/users/@me', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => console.log(res.data))
        
    })

    return (
        <>
            <NavBar />
            <h1 className="title">Profile</h1>
            <div className="profile">
                <img src="" alt="" className="avatar" />
                <p className="username">{  }</p>
                <p className="email"></p>
            </div>
        </>
    );
}

export default Profile;