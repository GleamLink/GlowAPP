import axios from "axios"

export const getToken = () => {
    return sessionStorage.getItem("token") || null
}

export const api = axios.create({
    baseURL: "https://api.glowapp.eu/api/",
    headers: {
        'Authorization': 'Bearer ' + getToken()
    }
})

export const getUser = () => {
    const userStr = api.get("/auth/account")
    if (userStr) return JSON.parse(userStr)
    else return null
}

export const isLogged = () => {
    if(getToken() != null) return true
    else return false
}

export const setUserSession = (token) => {
    sessionStorage.setItem("token", token)
}

export const removeUserSession = () => {
    sessionStorage.removeItem("token")
}