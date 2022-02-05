import { useEffect, useState } from "preact/hooks";
import NavBar from "../../components/navbar/NavBar";
import StatusShower from "../../components/statusshower/StatusShower";
import { api, getUser } from "../../Utils/Common";
import './_profile.scss'

// ICONS
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

function Profile() {

    const [user, setUser] = useState({})
    const [hoverMsg, setHoverMsg] = useState(null)

    useEffect(() => {

        // GET USER
        api.get('/users/@me', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => setUser(res.data))
        
    }, [])

    const copyIdHandler = async () => {
        navigator.clipboard.writeText(user.id)
        console.log("copied")
        setHoverMsg("Copied!")
    }

    return (
        <>
            <NavBar />
            <h1 className="title">Profile</h1>
            <div className="profile">
                {/* <img src={ 'https://api.glowapp.eu/forest/assets/avatars/' + user.avatar } width="30px" height="30px" alt={user.username + "'s avatar"} className="avatar" /> */}
                <div className="baseContainer">
                    <div className="testImg" />
                    <div className="usernameContainer">
                        <p className="username">{ user.username }</p>
                        <a className="copyId" onClick={copyIdHandler} onMouseEnter={() => setHoverMsg("Click to copy!")} onMouseLeave={() => setHoverMsg(null)} >{ user.id }</a>
                        {hoverMsg && (
                            <div className="copyMessage">
                                <p>{ hoverMsg }</p>
                            </div>
                        )}
                    </div>
                    
                </div>
                <div className="editableItem"> {/* USERNAME */}
                    <p className="itemTitle">Username</p>
                    <p>{ user.username }</p>
                    <button className="editBtn">Edit</button>
                </div>
                <div className="editableItem">
                    <p className="itemTitle">Email</p>
                    <p>{ user.email }</p>
                    <button className="editBtn">Edit</button>
                </div>
                
                <p className="email"></p>
            </div>
        </>
    );
}

export default Profile;