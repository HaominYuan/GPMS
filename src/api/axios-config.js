import axios from "axios";

// export const api = axios.create({
//     baseURL: "http://localhost",
// });

const TOKEN = "accesstoken"

axios.interceptors.request.use(config => {
    let token = window.localStorage.getItem(TOKEN)
    if (token) {
        config.headers.accessToken = token
    }
    return config

}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    if (response.headers[TOKEN]) {
        console.log(response.headers[TOKEN])    
        window.localStorage.setItem("accesstoken", response.headers[TOKEN])
    }
    return response
})

export const api = axios

export const Endpoints = {
    heroes: "heroes",
    antiHeroes: "anti-heroes",
};
