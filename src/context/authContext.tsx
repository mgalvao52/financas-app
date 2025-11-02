import { createContext } from "react"
import type { User } from "../types/util";

const authContext = createContext({
    user: {} as User,
    login: (userData:User) => {
        // console.log("login");
    },
    logout: () => {
        // console.log("logout");
    },
    loading: false

})

export default authContext