import React from "preact/compat"
import { Redirect, Route } from "react-router-dom"

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => {
                return !sessionStorage.getItem('token') ? <Component {...props} />
                    : <Redirect to={{ pathname: "/" }} />
            }}
        />
    )
}

export default PublicRoute