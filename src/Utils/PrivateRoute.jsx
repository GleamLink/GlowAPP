import React from "preact/compat"
import { Redirect, Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return sessionStorage.getItem('token') ? <Component {...props} /> :
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        }} />
    )
}

export default PrivateRoute