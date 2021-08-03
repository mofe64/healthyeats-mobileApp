import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/auth/Register';
import LoginScreen from '../screens/auth/Login ';
import BioForm from '../screens/auth/Bio';
import ProfilePhotoPicker from '../screens/auth/ProfilePicture';

const RegistrationStack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <RegistrationStack.Navigator screenOptions={{headerShown: false}}>
            <RegistrationStack.Screen name="REGISTER" component={RegisterScreen} />
            <RegistrationStack.Screen name="LOGIN" component={LoginScreen} />
            <RegistrationStack.Screen name="BIO" component={BioForm} />
            <RegistrationStack.Screen name="PROFILEPICTURE" component={ProfilePhotoPicker}/>
        </RegistrationStack.Navigator>
    )
}

export default AppNavigator;