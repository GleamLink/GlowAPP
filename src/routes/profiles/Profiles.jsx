import { Avatar } from "@mui/material";
import { useEffect, useState } from "preact/hooks";
import NavBar from "../../components/navbar/NavBar";
import { api } from "../../Utils/Common";

import { io } from "socket.io-client"

import "./_profiles.scss"

function Profiles({socket}) {
    console.log(this.props)
    const userId = window.location.pathname.substring(10, window.location.pathname.length)
    
    const [currentUser, setCurrent] = useState(null);
    const [profileUser, setProfileUser] = useState(null)
    const [profilePosts, setProfilePosts] = useState(null)

    useEffect(() => {
        api.get('/users/@me', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setCurrent(res.data)
            api.get('/users/' + userId, {
                headers: {
                    "authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res2 => {
                console.log("AAA: " + res.data.id, userId, res.data.id === userId)
                if(res.data.id === userId) return props.history.push('/profile')
                setProfileUser(res.data)
            })
        })
    }, [])

    const followUser = () => {
        api.post("/users/" + userId + "/follow", {}, {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        console.log({
            senderId: userId,
            receiverId: currentUser.id,
            type: 1
        })
        socket.emit("sendNotif", {
            senderId: userId,
            receiverId: currentUser.id,
            type: 1
        })
    }

    return (
        <>
            <NavBar />
            {!profileUser ? (<h1>Invalid user</h1>) : (
                <div className="profilePage">
                    <div className="profileInfo">
                        <div className="top">
                            <Avatar
                                src={profileUser.avatar && "https://forest.glowapp.eu/assets/avatars/" + profileUser.avatar}
                                className="avatar"
                            />
                            <div className="topRight">
                                <span className="username">{profileUser.username}</span>
                                <button className="followBtn" onClick={followUser}>Follow</button>
                                <span className="followersFollowing">{profileUser.followers.length} followers • {profileUser.following.length} following</span>
                            </div>
                        </div>
                        {profileUser.bio.length > 0 && (
                            <div className="bio">
                                <span className="bioTitle">bio</span>
                                <span className="bioText">{profileUser.bio}</span>
                            </div>
                        )}
                    </div>
                    {profilePosts ? (
                        <div className="profilePosts">

                        </div>
                    ) : <span>This user has no posts or the posts are private.</span>}
                </div>
            )}
        </>
    );
}

export default Profiles;