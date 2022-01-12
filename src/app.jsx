import "./_app.scss"

import Home from "./routes/home/Home";
import Login from "./routes/login/Login";

import Router from 'preact-router';

export function App(props) {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
    </Router>
    
  )
}
