import { useContext, useState } from "react";
import { login } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

import AuthForms from "../components/auth/AuthForms";


function LoginScreen(){
    const [isAuthenticating, setIsAuthenticating]=useState(false);

    const authCtx=useContext(AuthContext);

    async function loginHandler({email, password}){
        setIsAuthenticating(true);
        try{
            const token=await login(email, password);
            authCtx.authenticate(token, email);
        }catch(error){
            Alert.alert(
                "Authentication Failed",
                "Could not log in, please try again later"
            )
        }
        setIsAuthenticating(false);
    }
    if(isAuthenticating){
        // show a loading animation
        return;
    }


    return(
        <AuthForms login={true} onSubmit={loginHandler} />
    )
}

export default LoginScreen;