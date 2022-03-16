import "./_chat.scss"
import NavBar from "../../components/navbar/NavBar"
import { useEffect, useRef, useState } from "preact/hooks";
import { api, getUser } from "../../Utils/Common";
import Conversation from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import axios from "axios";

// Icons
import { EmojiEmotions } from '@mui/icons-material';

import { io } from "socket.io-client"
import { sendSocketMessage } from "../../Utils/SocketIO.js";
import { Skeleton } from "@mui/material";

function Chat(props) {

    const [loading, setLoading] = useState(true)
    const [msgLoading, setMsgLoading] = useState(false)
    const [error, setError] = useState(null)

    const [user, setUser] = useState([])

    const [conversations, setConversations] = useState([])

    const [currentChat, setCurrentChat] = useState(null)

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)

    const [onlineUsers, setOnlineUsers] = useState([])

    const scrollRef = useRef()

    const convId = props.match.params.convId || null
    
    const [socket, setSocket] = useState(io('https://ws.glowapp.eu/'));

    const execUseEffects = () => {

        useEffect(() => {
            setSocket(io('https://ws.glowapp.eu/'))
        }, []);

        useEffect(() => {
            socket.on("getMessage", data => {
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now()
                })
            })
        }, [socket])
    
        useEffect(() => {
            arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage])
        }, [arrivalMessage, currentChat])
    
        useEffect(() => {
            if(user === null) return
            socket?.emit("addUser", user.id)
            socket?.on('getUsers', users => {
                setOnlineUsers(users)
            })
        }, [user])
    
        useEffect(async () => {
            await api.get('/users/@me', {
                headers: {
                    "authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then((res) => {
                setUser(res.data)
            })
            .catch(err => {
                console.error(err)
                setError(err)
            })
            
            await api.get('/conversations', {
                headers: {
                    "authorization": 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(res => {
                setConversations(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError(err)
            })
            
        }, [])
    
        useEffect(async () => {
            if(conversations.length) {
                setMsgLoading(true)
                await api.get('/conversations/' + currentChat.conversationId + '/messages', {
                    headers: {
                        "authorization": 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(res => {
                    setMessages(res.data)
                }).catch(err => setError(err)).then(() => setMsgLoading(false))
            }
        }, [currentChat])
    }
    execUseEffects()

    const handleSendMessage = async (e) => {
        e.preventDefault()
        const message = {
            text: newMessage,
            conversationId: currentChat.conversationId
        }

        const receiverId = currentChat.members.find(
            member => member !== user.id
        )

        try {
            const res = await api.post('/messages', message, { headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }})
            setMessages([...messages, res.data])
            console.log("Msg: " + newMessage)

            socket.emit("sendMessage", {
                senderId: user.id,
                receiverId: receiverId,
                text: newMessage
            })

            setNewMessage('')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView()
    }, [messages])

    return (
        <>
            <NavBar socket={socket} />
            <div className="chatContainer">
                {error && (<h1>{error}</h1>)}
                <div className="menu">
                    <div className="menuWrapper">
                        <input placeholder="Search..." className="searchInput" />
                        {loading && (<h1>Loading...</h1>)}
                        {conversations.length ? conversations.map((conv, key) => {
                            const receiverId = conv.members.find(
                                member => member !== user.id
                            )
                            return (<div onClick={() => {
                                setCurrentChat(conv)
                            }}>
                                <Conversation receiverId={receiverId} />
                            </div>)
                        }) : (<span style={
                            {
                                color: "white",
                                position: "relative",
                                top: "20px",
                                textAlign: "center"
                            }
                        }>No conversations...</span>)}
                    </div>
                </div>
                <div className="box">
                    <div className="boxWrapper">
                        {currentChat ? <>
                            <div className="chatBoxTop">
                                
                                {messages.length ? messages.map((m, key) => (
                                    <div ref={scrollRef}>
                                        <Message
                                            key={key}
                                            message={m}
                                            user={user}
                                            own={m.authorId === user.id}
                                            currentChat={currentChat}
                                            loading={msgLoading}
                                        />
                                    </div>
                                    
                                    
                                )) : (
                                    <div className="noMessages">
                                        <span className="text">No messages present in this conversation...</span>
                                    </div>
                                )}
                                

                            </div>
                            <div className="chatBoxBottom">
                                <div className="chatInputContainer">
                                    <textarea
                                        className="chatInput"
                                        placeholder="Send a message..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if(e.shiftKey && e.key === 'Enter') {
                                                
                                            }
                                            else if(!e.shiftKey && e.key === 'Enter') {
                                                handleSendMessage(e)
                                            }
                                        }}
                                        value={newMessage}
                                    />
                                    {/* <EmojiEmotions
                                        onClick={handleEmojiListClick}
                                        className="chatInputEmojiSelector"
                                    /> */}
                                </div>
                                <button
                                    className="chatSubmit"
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.replace(/\s/g, '').length ? true : false}
                                    style={ !newMessage.replace(/\s/g, '').length ? "cursor: no-drop" : "cursor: pointer" }
                                >Send</button>
                            </div>
                        </> : <span className="noConv">Click left to open a conversation</span>}
                        
                    </div>
                </div>
                {/* <div className="online">
                    <div className="onlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            user={user}
                            setCurrentChat={setCurrentChat}
                        />
                            
                    </div>
                </div> */}
            </div>
        </>
        
            
    );
}

export default Chat;
