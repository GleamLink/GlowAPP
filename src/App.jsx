import "./_app.scss"

import { useEffect, useRef, useState } from "preact/hooks";

import Login from "./routes/login/Login";
import Register from "./routes/register/Register";

import Home from "./routes/home/Home"
import Search from "./routes/search/Search"
import Posts from "./routes/posts/Posts"
import Communities from "./routes/communities/Communities"
import Tunes from "./routes/tunes/Tunes"

import PrivateRoute from "./Utils/PrivateRoute"
import PublicRoute from "./Utils/PublicRoute";

import Profile from "./routes/profile/Profile";

import NotFound from "./routes/notfound/NotFound";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import React from 'react'
import { api, getToken, removeUserSession, setUserSession } from "./Utils/Common";
import { Route } from "preact-router";
import Chat from "./routes/chat/Chat";
import Users from "./routes/users/Users";
import { io } from "socket.io-client";
import Admin from "./routes/admin/Admin";
import Profiles from "./routes/profiles/Profiles";
import VoiceChat from "./routes/voiceChat/VoiceChat";
// import Room from "./routes/voiceroom/room/Room";

const SocketContext = React.createContext()

export function App(props) {
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  var socket = io("https://ws.glowapp.eu/")
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    socket.emit('addUser', userId)
  }, [socket])

  useEffect(() => {
    const token = getToken()

    if(!token) return;

    api.get('/auth/account', { 
      headers: {
        "authorization": 'Bearer ' + sessionStorage.getItem('token')
      }
    }).then(res => {
      setUserSession(res.data.token)
      setAuthLoading(false)
      setUserId(res.data.id)
    }).catch(err => {
      removeUserSession()
      setAuthLoading(false)
      console.log(err)
    })
  }, [])

  if(authLoading && getToken()) {
    return <div className="checkAuth">Checking Authentication...</div>
  }

  if(loading) return ("Loading")
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />

        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />

        <PrivateRoute exact path="/search" component={Search} />
        <PrivateRoute exact path="/chat">
          <Chat socket={socket} />
        </PrivateRoute>
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/communities" component={Communities} />
        <PrivateRoute exact path="/tunes" component={Tunes} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/profiles/:userId">
          <Profiles socket={socket} />
        </PrivateRoute>
        <PrivateRoute exact path="/voice">
          <VoiceChat socket={socket} />
        </PrivateRoute>

        <PrivateRoute exact path="/admin" component={Admin} />

        <Route exact path="*" component={NotFound} />        
      </Switch>
      
    </Router>
      
  )
}
