import "./_app.scss"

import { lazy, Suspense } from "preact/compat";

import { useEffect } from "preact/hooks";

const Home = lazy(() => import("./routes/home/Home"));
const Login = lazy(() => import("./routes/login/Login"));
const Friends = lazy(() => import("./routes/friends/Friends"));
const Posts = lazy(() => import("./routes/posts/Posts"));
const Communities = lazy(() => import("./routes/communities/Communities"));
const Tunes = lazy(() => import("./routes/tunes/Tunes"));


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { CookiesProvider } from 'react-cookie';
import { api, getToken, setUserSession } from "./Utils/Common";

export function App(props) {
  useEffect(() => {
    const token = getToken()

    if(!token) return;

    api.get('/auth/account').then(res => {
      setUserSession(res.data.token)
    })
  })
  return (
      <Router>
        <Suspense>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/communities" component={Communities} />
            <Route exact path="/tunes" component={Tunes} />
          </Switch>
        </Suspense>
        
      </Router>
    
  )
}
