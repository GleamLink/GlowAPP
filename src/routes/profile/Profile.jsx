import { useEffect, useState } from "preact/hooks";
import NavBar from "../../components/navbar/NavBar";
import StatusShower from "../../components/statusshower/StatusShower";
import { api, genBase64, getUser } from "../../Utils/Common";
import './_profile.scss'

// ICONS
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HelpIcon from '@mui/icons-material/Help';

import PopupMenu from "../../components/popupMenu/PupupMenu";

import { Alert, Avatar, Badge, Snackbar, Tooltip } from "@mui/material";
import FollowRequests from "./followRequests/FollowRequests";

function Profile() {

    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState({})
    const [avatarUrl, setAvatarUrl] = useState('')

    const [obscuredMail, setObscuredMail] = useState('')
    const [isObscuredMail, setIsObscuredMail] = useState(true)

    const [hoverMsg, setHoverMsg] = useState(null)
    const [isPopupUsername, setIsPopupUsername] = useState(false)
    const [isPopupEmail, setIsPopupEmail] = useState(false)

    const [inputOldEmail, setInputOldEmail] = useState(null)
    const [inputPassword, setInputPassword] = useState(null)
    const [inputNewEmail, setInputNewEmail] = useState(null)
    const [inputUsername, setInputUsername] = useState(null)

    const [isFirstOpen, setIsFirstOpen] = useState(false)

    const [newAvatar, setNewAvatar] = useState(null)
    
    const obscureEmail = (email) => {
        const [name, domain] = email.split('@');
        return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
    };

    useEffect(() => {

        // GET USER
        api.get('/users/@me', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setUser(res.data)
            setObscuredMail(obscureEmail(res.data.email))
            setAvatarUrl("https://forest.glowapp.eu/assets/avatars/" + res.data.avatar)
            setIsLoading(false)
        })
        
    }, [isPopupUsername, isPopupEmail])

    
    
    const copyIdHandler = async () => {
        navigator.clipboard.writeText(user.id)
        setHoverMsg("Copied!")
    }

    const [isHovering, setIsHovering] = useState(false)

    const handlePostNewAvatar = (base64, password) => {
        try {
            api.patch("users/@me", {
                "password": "c3cemel",
                "avatar": base64
            }, {
                headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            })
        } catch (err) {
            
        }
    }

    if(isLoading) return ("Loading")
    return (
        <>
            <NavBar />

            <div className="profilePage">
                    <div className="profileInfo">
                        <div className="top">
                            <div className="avatarContainer" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                                <input type="file" className="avatarInput" onChange={e => {
                                    console.log(e.target.files[0])
                                    genBase64(e.target.files[0], (err, res) => {
                                        if(err) return console.log(err)
                                        handlePostNewAvatar(res)
                                        setNewAvatar(res)
                                    })
                                }} />
                                <Avatar
                                    src={ newAvatar ? newAvatar : avatarUrl }
                                    className="avatar"
                                    sx={{ width: 100, height: 100 }}
                                    style={{"font-size": "40px"}} 
                                >{ user.username[0] }</Avatar>
                                {isHovering && 
                                    <div className="hide">
                                        <p>Click to change avatar</p>
                                    </div>}
                                
                            </div>
                            <div className="topRight">
                                <span className="username">{user.username}</span>
                                <span className="followersFollowing">{user.followers.length} followers • {user.following.length} following</span>
                            </div>
                        </div>
                        <p className="itemTitle">Email</p>
                        <p>{ isObscuredMail ? obscuredMail : user.email } <small 
                                onClick={() => setIsObscuredMail(!isObscuredMail)} 
                                className="showEmail"
                            >{
                                isObscuredMail ? "Show" : "Hide"
                            }</small>
                        </p>
                        {user.bio.length > 0 && (
                            <div className="bio">
                                <span className="bioTitle">bio</span>
                                <span className="bioText">{user.bio}</span>
                            </div>
                        )}
                    </div>
                    {/* {profilePosts ? (
                        <div className="profilePosts">

                        </div>
                    ) : <span>This user has no posts or the posts are private.</span>} */}
            </div>
            <FollowRequests />
            <Snackbar variant="filled" open={isFirstOpen} autoHideDuration={6000} onClose={() => setIsFirstOpen(false)}>
                <Alert onClose={() => setIsFirstOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Username changed successfully to {user.username}!
                </Alert>
            </Snackbar>
        </>
    );
}

export default Profile;