import React,{useEffect, useReducer, useMemo,} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/Register';
import LoginScreen from '../screens/auth/Login ';
import BioForm from '../screens/auth/Bio';
import ProfilePhotoPicker from '../screens/auth/ProfilePicture';
import RegistrationComplete from '../screens/auth/RegistrationComplete';

export const RegistrationActions = {
    FIRST_STAGE: 'FIRST_STAGE',
    SECOND_STAGE: 'SECOND_STAGE',
    THIRD_STAGE: 'THIRD_STAGE',
    LOGIN: 'LOGIN',
}

const authenticationStack = createNativeStackNavigator();

const AuthStack = () => {
    return (
            <authenticationStack.Navigator screenOptions={{headerShown: false}}>
                <authenticationStack.Screen name="REGISTER" component={RegisterScreen} />
                <authenticationStack.Screen name="LOGIN" component={LoginScreen} />
                <authenticationStack.Screen name="BIO" component={BioForm} />
                <authenticationStack.Screen name="PROFILEPICTURE" component={ProfilePhotoPicker} />
                <authenticationStack.Screen name="COMPLETE" component={RegistrationComplete} />
            </authenticationStack.Navigator>
    )
}

export default AuthStack;