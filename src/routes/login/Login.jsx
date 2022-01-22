import NavBar from "../../components/navbar/NavBar.jsx"
import axios from "axios"

const api = axios.create({
    baseURL: "https://api.glowapp.eu/api/",
})

import "./_login.scss";
import { useCookies, CookiesProvider } from "react-cookie";
import react from "react"
import { render } from "preact";

function Login() {
    const onClickHandler = () => {
        console.log("HEY")
        api.post('/auth/login').then(res => console.log(res))
    }

    return (
        <>
            <NavBar />
            <h1 className="title">Login</h1>
            {/* <form className="loginForm"> */}
                <input className="loginTextInput" type="text" placeholder="Username"/>
                <input className="loginTextInput" type="text" placeholder="Password" />
                <button className="loginButtonInput" onClick={onClickHandler}>Login</button>
            {/* </form> */}
            <button onClick={this.onClickHandler} style={"width: 100px"}>HEY</button>
        </>
    );
}

export default Login;