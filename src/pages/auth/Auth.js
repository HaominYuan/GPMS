
import { createContext, useContext, useState } from "react"
import axios from 'axios'

const authContext = createContext()

const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth()

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

const useAuth = () => {
    return useContext(authContext)
}

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    const signin = (cb, {username, password}) => {
        axios.get('login', {
            params: {
                username,
                password
            }
        }).then(response => {
            cb(response)
        }).catch(error => {
            console.log(error)
        })
    }

    const signout = (cb) => {
        setUser(null)
        cb()
    }

    return {
        user, signin, signout
    }
}

export {useAuth, ProvideAuth}