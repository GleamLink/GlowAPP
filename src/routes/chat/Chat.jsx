import "./_chat.scss"
import NavBar from "../../components/navbar/NavBar"
import { useEffect, useRef, useState } from "preact/hooks";
import { api, getUser } from "../../Utils/Common";
import Conversation from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import axios from "axios";

import { io } from "socket.io-client"

function Chat() {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [user, setUser] = useState([])

    const [conversations, setConversations] = useState([])

    const [currentChat, setCurrentChat] = useState(null)

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    const socket = useRef()
    
    const execUseEffects = () => {
        useEffect(() => {
            socket.current = io("https://ws.glowapp.eu/", {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                transports: ["polling"]
            })
            socket.current.on("getMessage", data => {
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now()
                })
            })
        }, [])
    
        useEffect(() => {
            arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages(prev => [...prev, arrivalMessage])
        }, [arrivalMessage, currentChat])
    
        useEffect(() => {
            if(user === null) return
            socket.current.emit("addUser", user.id)
            socket.current.on('getUsers', users => {
                console.log(users)
            })
        }, [user])
    
        useEffect(() => {
            const getUser = async () => {
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
            }
            getUser()
            
            const getConvs = async () => {
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
            }
            getConvs()
            
        }, [])
    
        useEffect(() => {
            const getMessages = async () => {
                await api.get('/conversations/' + currentChat.conversationId + '/messages', {
                    headers: {
                        "authorization": 'Bearer ' + sessionStorage.getItem('token')
                    }
                }).then(res => {
                    setMessages(res.data)
                }).catch(err => setError(err))
            }
            if(conversations.length)
                getMessages()
            
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

        socket.current.emit("sendMessage", {
            senderId: user.id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await api.post('/messages', message, { headers: {
                "authorization": 'Bearer ' + sessionStorage.getItem('token')
            }})
            setMessages([...messages, res.data])
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
            <NavBar />
            <div className="chatContainer">
                {error && (<h1>{error}</h1>)}
                <div className="menu">
                    <div className="menuWrapper">
                        <input placeholder="Search..." className="searchInput" />
                        {loading && (<h1>Loading...</h1>)}
                        {conversations.length ? conversations.map((conv, key) => {
                            return (<div onClick={() => setCurrentChat(conv)}>
                                <Conversation key={key} conv={conv} user={user} />
                            </div>)
                        }) : (<span style={
                            {
                                color: "white",
                                position: "relative",
                                top: "20px",
                                textAlign: "center"
                            }
                        }>No conversations...</span>)}
                        {/* <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation /> */}
                    </div>
                </div>
                <div className="box">
                    <div className="boxWrapper">
                        {currentChat ? <>
                            <div className="chatBoxTop">
                                {messages.map((m, key) => (
                                    <div ref={scrollRef}>
                                        <Message
                                            key={key}
                                            message={m}
                                            user={user}
                                            own={m.authorId === user.id}
                                            currentChat={currentChat}
                                        />
                                    </div>
                                ))}
                                

                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatInput"
                                    placeholder="Send a message..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                />
                                <button
                                    className="chatSubmit"
                                    onClick={handleSendMessage}
                                    disabled={newMessage !== "" ? false : true}
                                    style={ newMessage !== "" ? "cursor: pointer" : "cursor: no-drop" }
                                >Send</button>
                            </div>
                        </> : <span className="noConv">Click left to open a conversation</span>}
                        
                    </div>
                </div>
                <div className="online">
                    <div className="onlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
        
            
    );
}

export default Chat;
