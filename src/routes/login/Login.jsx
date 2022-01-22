import NavBar from "../../components/navbar/NavBar.jsx"
import "./_login.scss";

function Login() {
    return (
        <>
            <NavBar />
            <h1 className="title">Login</h1>
            <form className="loginForm" action="">
                <input className="loginTextInput" type="text" placeholder="Username"/>
                <input className="loginTextInput" type="text" placeholder="Password" />
                <button className="loginButtonInput" type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;