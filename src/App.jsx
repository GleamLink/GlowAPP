import "./_app.scss"

import { lazy, Suspense } from "preact/compat";

import { useEffect } from "preact/hooks";

import Home from "./routes/home/Home"
import Login from "./routes/login/Login";
import Friends from "./routes/friends/Friends"
import Posts from "./routes/posts/Posts"
import Communities from "./routes/communities/Communities"
import Tunes from "./routes/tunes/Tunes"

import PrivateRoute from "./Utils/PrivateRoute"
import PublicRoute from "./Utils/PublicRoute";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { CookiesProvider } from 'react-cookie';
import { api, getToken, removeUserSession, setUserSession } from "./Utils/Common";

export function App(props) {
  useEffect(() => {
    const token = getToken()

    if(!token) return;

    api.get('/auth/account').then(res => {
      setUserSession(res.data.token)
    }).catch(err => {
      removeUserSession()
      console.log("Invalid token")
      this.props.history.push('/login')
    })
  })
  return (
      <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/friends" component={Friends} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/communities" component={Communities} />
            <PrivateRoute exact path="/tunes" component={Tunes} />
          </Switch>
        
      </Router>
    
  )
}
