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
    THIRD_STAGE: 'THIRD_STAGE'
}

const authenticationStack = createNativeStackNavigator();
export const UserContext = React.createContext();
const AuthStack = () => {
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case RegistrationActions.FIRST_STAGE:
                    return {
                        ...prevState,
                        username: action.username,
                        email: action.email,
                        password: action.password
                    };
                case RegistrationActions.SECOND_STAGE:
                    return {
                        ...prevState,
                        firstname: action.firstname,
                        lastname: action.lastname,
                        mobileNumber: action.mobile
                    };
                case RegistrationActions.THIRD_STAGE:
                    return {
                        ...prevState,
                        profile: action.profilePicture
                    };
            }
        },
        {
            username: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobileNumber: '',
            profile: ''
        }
    );

    const userContext = useMemo(
        () => ({
            firstStage: data => {
                dispatch({ type: RegistrationActions.FIRST_STAGE, username: data.username, email: data.email, password: data.password });
            },
            secondStage: data => {
                dispatch({ type: RegistrationActions.SECOND_STAGE, firstname: data.firstname, lastname: data.lastname, mobile: data.mobile });
            },
            thirdStage: data => {
                dispatch({ type: RegistrationActions.THIRD_STAGE, profilePicture: data.profile })
            },
            userDetails: state
        }),
        [state]
    );

    return (
        <UserContext.Provider value={userContext}>
            <authenticationStack.Navigator screenOptions={{headerShown: false}}>
                <authenticationStack.Screen name="REGISTER" component={RegisterScreen} />
                <authenticationStack.Screen name="LOGIN" component={LoginScreen} />
                <authenticationStack.Screen name="BIO" component={BioForm} />
                <authenticationStack.Screen name="PROFILEPICTURE" component={ProfilePhotoPicker} />
                <authenticationStack.Screen name="COMPLETE" component={RegistrationComplete} />
            </authenticationStack.Navigator>
        </UserContext.Provider>
    )
}

export default AuthStack;