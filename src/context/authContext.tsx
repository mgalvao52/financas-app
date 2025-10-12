import { createContext } from "react"

const authContext = createContext({
    isAuthenticated: false,
    login: () => {
        console.log("login");
    },
    logout: () => {
        console.log("logout");
    }

})

export default authContext