import NavBar from "../../components/navbar/NavBar.jsx"
import axios from "axios"
import { getUser, getToken, setUserSession, removeUserSession, api } from "../../Utils/Common"

import "./_register.scss";
import react from "react"

function Register() {
    const onClickHandler = async () => {
        setError(null)
        setLoading(true)
        if(password !== password2) {
            setLoading(false)
            return setError("The two passwords aren't the same")
        }
        api.post("/auth/signup", {
            email: email,
            username: username,
            password: password
        }).then(res => {
            setLoading(false)
            if(res.data.message) return setError(res.data.message)
            setSuccess("Account created successfully")
            this.props.history.push('/')
        }).catch(err => {
            setLoading(false)
            console.log(err.response)
            if(err.response.status === 401 || err.response.status === 400 || err.response.status === 500) {
                setError(err.response.data.message)
            }
        })
    }

    const [email, setEmail] = react.useState('')
    const [username, setUsername] = react.useState('')
    const [password, setPassword] = react.useState('')
    const [password2, setPassword2] = react.useState('')

    const [error, setError] = react.useState(null)
    const [success, setSuccess] = react.useState(null)
    const [loading, setLoading] = react.useState(false)

    return (
        <>
            <div className="signupContainer">
                <div className="signupForm">
                    <h1 className="signupTitle">Signup</h1>
                    <span className="signupTextLabel">E-mail Address</span>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="loginTextInput"
                        placeholder="Enter your E-mail"
                    />
                    <span className="signupTextLabel">Username</span>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="loginTextInput"
                        placeholder="Enter a Username"
                    />
                    <span className="signupTextLabel">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="loginTextInput"
                        placeholder="Enter your Password"
                    />
                    <span className="signupTextLabel">Password</span>
                    <input
                        type="password"
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                        className="loginTextInput"
                        placeholder="Re-enter your Password"
                    />
                    <input
                        type="button"
                        value={loading ? "Loading..." : "Signup"}
                        disabled={loading}
                        className="loginButtonInput"
                        onClick={onClickHandler}
                    />
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <p className="noAcc">Already have an account? Click <a href="/login">here</a> to login.</p>
                </div>
            </div>
            
        </>
    );
}

export default Register;