import NavBar from "../../components/navbar/NavBar.jsx"
import axios from "axios"
import { setUserSession, api } from "../../Utils/Common"

import "./_login.scss";
import react from "react"
import { Alert, Snackbar } from "@mui/material";

function Login() {
    const onClickHandler = () => {
        setError(null)
        setLoading(true)
        api.post("/auth/login", {
            email: email,
            password: password
        }).then(res => {
            setUserSession(res.data.token)
            
            setLoading(false)
            this.props.history.push('/')
        }).catch(err => {
            setLoading(false)
            if(err.response.status === 401 || err.response.status === 400) {
                setError(err.response.data.message)
            }
            else setError(err)
        })
    }

    const [email, setEmail] = react.useState('')
    const [password, setPassword] = react.useState('')
    const [error, setError] = react.useState(null)
    const [loading, setLoading] = react.useState(false)

    return (
        <>
            <div className="loginContainer">
                <div className="loginForm">
                    <h1 className="loginTitle">Login</h1>
                    <span className="loginTextLabel">E-mail Address</span>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="loginTextInput"
                        placeholder="Enter your E-mail"
                    />
                    <span className="loginTextLabel">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="loginTextInput"
                        placeholder="Enter your Password"
                    />
                    <input
                        type="button"
                        value={loading ? "Loading..." : "Login"}
                        disabled={loading}
                        className="loginButtonInput"
                        onClick={onClickHandler}
                    >Login</input>
                    <p className="noAcc">Have no account? Click <a href="/register">here</a> to make one.</p>
                    {error && <p className="error">{error}</p>}
                </div>
            </div>
        </>
    );
}

export default Login;