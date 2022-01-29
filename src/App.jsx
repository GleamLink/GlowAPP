import "./_app.scss"

import { lazy, Suspense } from "preact/compat";

const Home = lazy(() => import("./routes/home/Home"));
const Login = lazy(() => import("./routes/login/Login"));
const Friends = lazy(() => import("./routes/friends/Friends"));
const Posts = lazy(() => import("./routes/posts/Posts"));
const Communities = lazy(() => import("./routes/communities/Communities"));
const Tunes = lazy(() => import("./routes/tunes/Tunes"));


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import { CookiesProvider } from 'react-cookie';

export function App(props) {
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
