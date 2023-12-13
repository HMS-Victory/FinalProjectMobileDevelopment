import AuthForms from "../components/auth/AuthForms";
import {useContext, useState} from 'react';
import { createUser } from "../util/auth";
import {Alert} from "react-native";
import {AuthContext} from "../store/auth-context";

function SignupScreen(){
    const [isAuthenticating, setIsAuthenticating] =useState(false);

    const authCtx=useContext(AuthContext);

    async function signupHandler({email, password}){
        setIsAuthenticating(true);
        try{
            const token=await createUser(email, password);
            authCtx.authenticate(token, email);
        }catch(error){
            Alert.alert(
                "Authentication failed!", "Could not create user, please try again later"
            )
        }
        setIsAuthenticating(false);
    }

    if(isAuthenticating){
        // show loading anims
        return;
    }

    return <AuthForms onSubmit={signupHandler} />
}

export default SignupScreen;