import NavBar from "../../components/navbar/NavBar.jsx"
import axios from "axios"
import { getUser, getToken, setUserSession, removeUserSession } from "../../Utils/Common"

const api = axios.create({
    baseURL: "https://api.glowapp.eu/api/",
})

import "./_login.scss";
import react from "react"

function Login() {
    const onClickHandler = async () => {
        setError(null)
        setLoading(true)
        api.post("/auth/login", {
            email: email,
            password: password
        }).then(res => {
            setLoading(false)
            setUserSession(res.data.token)
            this.props.history.push('/')
        }).catch(err => {
            setLoading(false)
            console.log(err.response)
            if(err.response.status === 401 || err.response.status === 400) {
                setError(err.response.data.message)
            }
        })
    }

    const [email, setEmail] = react.useState('')
    const [password, setPassword] = react.useState('')
    const [error, setError] = react.useState(null)
    const [loading, setLoading] = react.useState(false)

    return (
        <>
            <NavBar />
            <h1 className="title">Login</h1>
            <div className="loginForm">
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="loginTextInput"
                    placeholder="Username"
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
            </div>
        </>
    );
}

export default Login;