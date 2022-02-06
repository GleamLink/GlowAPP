import { useEffect, useState } from "preact/hooks";
import NavBar from "../../components/navbar/NavBar";
import StatusShower from "../../components/statusshower/StatusShower";
import { api, getUser } from "../../Utils/Common";
import './_profile.scss'

// ICONS
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PopupMenu from "../../components/popupMenu/PupupMenu";
import { Alert, Avatar, Badge, Snackbar } from "@mui/material";

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
            setIsLoading(false)
        })
        
    }, [isPopupUsername, isPopupEmail])

    
    
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
                    <Badge 
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        variant="dot"
                        color="primary"
                    >
                        <Avatar src={ avatarUrl } sx={{ width: 100, height: 100 }} style={{"font-size": "40px"}} >{ user.username[0] }</Avatar>
                    </Badge>
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
                    <PopupMenu
                        title="Change username"
                        closeHandler={() => setIsPopupUsername(false)}
                        btnClickHandler={() => {
                            api.patch('/users/@me', {
                                "username": inputUsername,
                                "password": inputPassword
                            }, {
                                headers: {
                                    "authorization": 'Bearer ' + sessionStorage.getItem('token')
                                }
                            }).then((err, res) => {
                                if(err.status === 200) {
                                    setIsPopupUsername(false)
                                    setInputPassword(null)
                                    setInputOldEmail(null)
                                    setInputNewEmail(null)
                                    setInputUsername(null)

                                    setIsFirstOpen(true) // Open snackbar
                                }
                            })
                            
                        }}
                    >
                        <div className="inputContainer">
                                <p className="infoTitle">New Username</p>
                                <input 
                                    className="infoInput"
                                    type="email"
                                    placeholder="Enter your new Username."
                                    onChange={(e) => {
                                        setInputUsername(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="inputContainer">
                                <p className="infoTitle">Password</p>
                                <input 
                                    className="infoInput"
                                    type="password"
                                    placeholder="Enter your Password."
                                    onChange={(e) => {
                                        setInputPassword(e.target.value)
                                    }}
                                />
                            </div>
                    </PopupMenu>
                )}
                {isPopupEmail && (
                    <PopupMenu
                        title="Change Email"
                        onSuccess={(<Alert severity="success">Account updated successfully</Alert>)}
                        onError={(<Alert severity="error">Account could not be updated!</Alert>)}
                        btnClickHandler={() => {
                            if(inputOldEmail !== user.email) {
                                console.log("not same mail")
                                return (<Alert severity="error">Old email isn't the same.</Alert>)
                            }
                            api.patch('/users/@me', {
                                "email": inputNewEmail,
                                "password": inputPassword
                            }, {
                                headers: {
                                    "authorization": 'Bearer ' + sessionStorage.getItem('token')
                                }
                            }).then(() => {
                                setInputPassword(null)
                                setInputOldEmail(null)
                                setInputNewEmail(null)
                                setInputUsername(null)
                            })
                        }}
                        closeHandler={() => setIsPopupEmail(false)}
                    >
                            <div className="inputContainer">
                                <p className="infoTitle">Old Email</p>
                                <input 
                                    className="infoInput"
                                    type="email"
                                    placeholder="Enter your old Email."
                                    onChange={(e) => {
                                        setInputOldEmail(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="inputContainer">
                                <p className="infoTitle">Password</p>
                                <input 
                                    className="infoInput"
                                    type="password"
                                    placeholder="Enter your Password."
                                    onChange={(e) => {
                                        setInputPassword(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="inputContainer">
                                <p className="infoTitle">New Email</p>
                                <input 
                                    className="infoInput"
                                    type="email"
                                    placeholder="Enter your new Email."
                                    onChange={(e) => {
                                        setInputNewEmail(e.target.value)
                                    }}
                                />
                            </div>
                    </PopupMenu>
                )}
            </div>
            <Snackbar open={isFirstOpen} autoHideDuration={6000} onClose={() => setIsFirstOpen(false)}>
                <Alert onClose={() => setIsFirstOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Username changed successfully to {user.username}!
                </Alert>
            </Snackbar>
        </>
    );
}

export default Profile;