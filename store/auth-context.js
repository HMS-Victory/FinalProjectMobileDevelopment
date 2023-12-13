import AsyncStorage from "@react-native-async-storage/async-storage";

import {createContext, useState} from "react";

export const AuthContext=createContext({
    token: "",
    email: '', 
    isAuthenticated: false,
    authenticate: (token)=>{},
    logout: ()=>{},
});

function AuthContextProvider({children}){
    const [authToken, setAuthToken]=useState();
    const [email, setEmail]=useState();

    function authenticate(token, email){
        setAuthToken(token);
        setEmail(email);
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("email", email)
    }

    function logout(){
        setAuthToken(null);
        setEmail(null);
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('email');
    }

    const value={
        token: authToken,
        email:email,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;