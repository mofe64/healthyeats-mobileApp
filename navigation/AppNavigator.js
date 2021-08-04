import React,{useReducer} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/Register';
import LoginScreen from '../screens/auth/Login ';
import BioForm from '../screens/auth/Bio';
import ProfilePhotoPicker from '../screens/auth/ProfilePicture';
import RegistrationComplete from '../screens/auth/RegistrationComplete';
import AuthStack from './AuthStack';
import Home from '../screens/Home';

const RegistrationStack = createNativeStackNavigator();
const AuthContext = React.createContext();

const AppNavigator = () => {
    // const [state, dispatch] = useReducer(
    //     (prevState, action) => {
    //         switch (action.type) {
    //             case 'COMPLETED_REGISTRATION_FIRST_STAGE':
    //                 return {
    //                     ... prevState,
                        
    //                 }
    //         }
    //     }
    // )
    
    return (
        <>
            <AuthStack />
        </>
    )
}

export default AppNavigator;