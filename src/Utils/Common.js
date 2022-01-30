import axios from "axios"

export const getToken = () => {
    return sessionStorage.getItem("token") || null
}

export const api = axios.create({
    baseURL: "https://api.glowapp.eu/api",
    headers: {
        'Authorization': 'Bearer ' + getToken()
    }
})

export const getUser = () => {
    try {
        return api.get("/auth/account")
    } catch (error) {
        return error
    }
}

export const setUserSession = (token, user) => {
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("user", user)
}

export const removeUserSession = () => {
    sessionStorage.removeItem("token")
}