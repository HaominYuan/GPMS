
import { useLocalObservable } from "mobx-react"
import { api } from "../../api/axios-config"


const initalValues = {
    status: window.localStorage.getItem("accesstoken") ? true : false
}

const AuthContext = () => {
    const store = useLocalObservable(() => ({
        ...initalValues,

        async login(username, password) {
            const result = await api.get('login', {
                params: {
                    username,
                    password
                }
            })

            console.log(JSON.stringify(result.data))
        
            if (result.data.state === 'Yes') {
                store.status = true
            }
        },

        logout() {
            window.localStorage.removeItem("accesstoken")
        },

        // getStatus() {
        //     // console.log(window.localStorage.getItem("accessToken"))
        //     return window.localStorage.getItem("accessToken")
        // }
    }))
    return store
}

export default AuthContext