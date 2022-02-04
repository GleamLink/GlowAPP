import "./_app.scss"

import { useEffect, useState } from "preact/hooks";

import Home from "./routes/home/Home"
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import Friends from "./routes/friends/Friends"
import Posts from "./routes/posts/Posts"
import Communities from "./routes/communities/Communities"
import Tunes from "./routes/tunes/Tunes"

import PrivateRoute from "./Utils/PrivateRoute"
import PublicRoute from "./Utils/PublicRoute";

import { BrowserRouter as Router, Switch } from "react-router-dom";

import { api, getToken, removeUserSession, setUserSession } from "./Utils/Common";
import { Fragment } from "react";

export function App(props) {

  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const token = getToken()

    if(!token) return;

    api.get('/auth/account').then(res => {
      setUserSession(res.data.token)
      setAuthLoading(false)
    }).catch(err => {
      removeUserSession()
      setAuthLoading(false)
      this.props.history.push('/login')
    })
  }, [])

  if(authLoading && getToken()) {
    return <div className="checkAuth">Checking Authentication...</div>
  }

  return (
    <Router>
      <PrivateRoute exact path="/" component={Home} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/register" component={Register} />
      <PrivateRoute exact path="/friends" component={Friends} />
      <PrivateRoute exact path="/posts" component={Posts} />
      <PrivateRoute exact path="/communities" component={Communities} />
      <PrivateRoute exact path="/tunes" component={Tunes} />
    </Router>
      
  )
}
