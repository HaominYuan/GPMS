
import { createContext } from "react"
import { useLocalObservable } from "mobx-react"
import { api } from "../../api/axios-config"


const initalValues = {
    user: false
}

const AuthContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,

        // get user() {
        //     return store.user
        // },

        setUser(state) {
            store.user = state
        },

        async login(username, password) {
            const result = await api.get('login', {
                params: {
                    username,
                    password
                }
            })
            if (result.data.state === 'Yes') {
                store.user = true
            }
        },

        logout() {
            store.user = false
        }
    }))
    return store
}

export default AuthContext