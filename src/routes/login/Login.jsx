import NavBar from "../../components/navbar/NavBar.jsx"
import axios from "axios"
import { getUser, getToken, setUserSession, removeUserSession, api } from "../../Utils/Common"

import "./_login.scss";
import react from "react"

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
            <h1 className="title">Login</h1>
            <div className="loginForm">
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="loginTextInput"
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="loginTextInput"
                    placeholder="Password"
                />
                <input
                    type="button"
                    value={loading ? "Loading..." : "Login"}
                    disabled={loading}
                    className="loginButtonInput"
                    onClick={onClickHandler}
                >Login</input>
                {error && <p className="error">{error}</p>}
                <p className="noAcc">Have no account? Click <a href="/register">here</a> to make one.</p>
            </div>
        </>
    );
}

export default Login;