import { useEffect, useState } from "preact/hooks";
import NavBar from "../../components/navbar/NavBar";
import StatusShower from "../../components/statusshower/StatusShower";
import { api, getUser } from "../../Utils/Common";
import './_profile.scss'

// ICONS
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PopupMenu from "../../components/popupMenu/PupupMenu";
import { Avatar } from "@mui/material";

function Profile() {

    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState({})
    const [avatarUrl, setAvatarUrl] = useState('')

    const [obscuredMail, setObscuredMail] = useState('')
    const [isObscuredMail, setIsObscuredMail] = useState(true)

    const [hoverMsg, setHoverMsg] = useState(null)
    const [isPopupUsername, setIsPopupUsername] = useState(false)
    const [isPopupEmail, setIsPopupEmail] = useState(false)
    
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
            setAvatarUrl("https://api.glowapp.eu/forest/assets/avatars/" + res.data.avatar)
            console.log(avatarUrl)
            setIsLoading(false)
        })
        
    }, [])

    
    
    const copyIdHandler = async () => {
        navigator.clipboard.writeText(user.id)
        setHoverMsg("Copied!")
    }

    if(isLoading) return ("Loading")
    return (
        <>
            <NavBar />
            <h1 className="title">Profile</h1>
            <div className="profile">
                <div className="baseContainer">
                
                    <Avatar src={ avatarUrl } sx={{ width: 100, height: 100 }} style={{"font-size": "40px"}} >{ user.username[0] }</Avatar>
                    {/* <div className="testImg" /> */}
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
                    <button onClick={() => setIsPopupUsername(true)} className="editBtn">Edit</button>
                </div>
                <div className="editableItem">
                    <p className="itemTitle">Email</p>
                    <p>{ isObscuredMail ? obscuredMail : user.email } <small 
                            onClick={() => setIsObscuredMail(!isObscuredMail)} 
                            className="showEmail"
                        >{
                            isObscuredMail ? "Show" : "Hide"
                        }</small>
                    </p>
                    <button onClick={() => setIsPopupEmail(true)} className="editBtn">Edit</button>
                </div>
                {isPopupUsername && (
                    <PopupMenu title="Change username" array={[
                        {"title": "New Username", "input": {"type": "text", "text": "Enter your new Username."}},
                        {"title": "Password", "input": {"type": "password", "text": "Enter your Password."}}
                    ]} closeHandler={() => setIsPopupUsername(false)} />
                )}
                {isPopupEmail && (
                    <PopupMenu title="Change email" array={[
                        {"title": "New Email", "input": {"type": "text", "text": "Enter your new Email."}},
                        {"title": "Password", "input": {"type": "password", "text": "Enter your Password."}},
                        {"title": "Email", "input": {"type": "email", "text": "Enter your actual Email."}}
                    ]} closeHandler={() => setIsPopupEmail(false)} />
                )}
            </div>
        </>
    );
}

export default Profile;