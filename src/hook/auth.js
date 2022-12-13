import React, {useState, useEffect, createContext} from "react"
import nookies from "nookies"

import firebase from "firebase/compat/app"
import "firebase/compat/auth"


const AuthContext = createContext();
const AuthProvider = ({children}) => {
    // firebaseClient();
    const [user, setUser] = useState(null);

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if(!user){
                setUser(null);
                nookies.set(undefined, "token", "",{});
                return;
            }
            const token = await user.getIdToken();
            setUser(user);
            nookies.set(undefined, "token" , token,{});
            console.log(token, "USER TOKEN HERE")
        });
    }, []);

    return (<AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>);
}
// export const useAuth = () => useContext(AuthContext);
export {AuthContext, AuthProvider}
