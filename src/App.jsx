import "./_app.scss"

import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import Friends from "./routes/friends/Friends";
import Posts from "./routes/posts/Posts";
import Communities from "./routes/communities/Communities";
import Tunes from "./routes/tunes/Tunes";

import Router from 'preact-router';

import { CookiesProvider } from 'react-cookie';

export function App(props) {
  return (
    <CookiesProvider>
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Friends path="/friends" />
        <Posts path="/posts" />
        <Communities path="/communities" />
        <Tunes path="/tunes" />
      </Router>
    </CookiesProvider>
  )
}
