import "./_app.scss"

import { useEffect, useState } from "preact/hooks";

import Login from "./routes/login/Login";
import Register from "./routes/register/Register";

import Home from "./routes/home/Home"
import Friends from "./routes/friends/Friends"
import Posts from "./routes/posts/Posts"
import Communities from "./routes/communities/Communities"
import Tunes from "./routes/tunes/Tunes"

import PrivateRoute from "./Utils/PrivateRoute"
import PublicRoute from "./Utils/PublicRoute";

import NotFound from "./routes/notfound/NotFound";

import { BrowserRouter as Router } from "react-router-dom";

import { api, getToken, removeUserSession, setUserSession } from "./Utils/Common";
import { Route } from "preact-router";

export function App(props) {

  const [authLoading, setAuthLoading] = useState(true)

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
    }).catch(err => {
      removeUserSession()
      setAuthLoading(false)
      console.log(err)
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
      <Route path="*" component={NotFound} />
    </Router>
      
  )
}
