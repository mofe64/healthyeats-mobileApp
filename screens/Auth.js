import React, { useState } from 'react';
import { ImageBackground, View, Image } from 'react-native';
import LoginScreen from './auth/Login ';
import RegisterScreen from './auth/Register';

const Auth = () => {
    const [loginMode, setLoginMode] = useState(true);
    const toggleMode = () => {
        setLoginMode(!loginMode);
    }
    return (
        (loginMode) ? <LoginScreen toggleFunction={ toggleMode }/> : <RegisterScreen toggleFunction={toggleMode} />
    )
}

export default Auth;