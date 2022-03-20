import NavBar from "../../components/navbar/NavBar";
import "./_home.scss";

import { format } from 'timeago.js'

// Material Icons
import { Send, UploadFile, ThumbUpOffAlt, ThumbUpAlt } from '@mui/icons-material';

import { api } from "../../Utils/Common";
import { useEffect, useState } from "preact/hooks";
import { Avatar } from "@mui/material";

function Home() {

    const [user, setUser] = useState(null)

    const [postInput, setPostInput] = useState('')
    const [posts, setPosts] = useState([])

    const [followRequests, setFollowRequests] = useState([])

    const [isLiked, setIsLiked] = useState(false)
    
    useEffect(() => {
        api.get("/auth/account", {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setUser(res.data)
        })
    }, [])
    
    useEffect(() => {
        api.get('/posts', {
            headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setPosts(res.data)
        })
    }, [])

    useEffect(() => {
        api.get("/users/@me/followers/requests", {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(res => {
            setFollowRequests(res.data)
        }).catch(err => console.log(err))
    }, [])

    const createPostHandler = (e) => {
        console.log(e)
        if(e.key === "Enter" || e.type === "click") {
            if(!postInput.replace(/\s/g, '').length === "") return console.log("No valid message")
            api.post('/posts', {
                "description": postInput
            }, {
                headers: {
                    "authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                setPosts([res.data, ...posts])
                setPostInput('')
            }).catch(err => console.log(err))
        }
    }
    
    
    return (
        <div className="home">
            <NavBar />
            <div className="homePage">
                <div className="leftPage">
                    {followRequests.map((val, key) => {
                        <div className="request">
                            <div className="username">{val.requesterId}</div>
                        </div>
                    })}
                </div>
                <div className="centerPage">
                    <div className="sendPost">
                        <input
                            className="input"
                            placeholder="Create a post..."
                            value={postInput}
                            onChange={e => setPostInput(e.target.value)}
                            onKeyDown={createPostHandler}
                        />
                        <UploadFile className="icon icon2" />
                        <div className="vLine" /> {/* Vertical line separator */}
                        <Send className="icon" title="Hey" onClick={createPostHandler} />
                    </div>
                    <div className="postsContainer">
                        {posts.map((val, key) => {
                            return (
                                <div className="post">
                                        <div className="user">
                                            <Avatar className="avatar" />
                                            <div className="right">
                                                <span className="username">{val.username}</span>
                                                <span className="timeAgo">{format(new Date(val.createdAt * 1000), "fr_FR")}</span>
                                            </div>
                                            
                                        </div>
                                        {val.description && <p>{val.description}</p>}
                                        {val.image && <img width={400} src={"https://forest.glowapp.eu/assets/posts/" + val.image} />}
                                        <hr />
                                        <div className="opinion">
                                            {isLiked ? 
                                                <ThumbUpAlt className="likedIcon" onClick={() => setIsLiked(false)} /> : 
                                                <ThumbUpOffAlt className="likeIcon" onClick={() => setIsLiked(true)} />
                                            }
                                            <input className="commentInput" type="text" placeholder="Add comment..." />
                                        </div>
                                    </div>
                                )
                        })}
                    </div>
                    
                </div>
                <div className="rightPage">
                    
                </div>
                
            </div>
        </div>
    );
}

export default Home;
