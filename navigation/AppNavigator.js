import React, { useReducer, useMemo, useEffect, useState } from 'react';
import {View, ActivityIndicator, StyleSheet } from 'react-native';
import AuthStack from './AuthStack';
import Home from '../screens/Home';
import { userRegisterUrl, startUpUrl, loginUrl } from '../constants/Urls';
import * as SecureStore from 'expo-secure-store';
import { UserContext } from '../util/contextStore';

const AuthKey = "authenticationDetails";
const addItemToStore = async (key,value) => {
    await SecureStore.setItemAsync(key, value);
}
const getItemFromStore = async (key) => {
    let resultString = await SecureStore.getItemAsync(key);
    const result = JSON.parse(resultString);
    return result;
}

const clearItemFromStore = async (key) => {
    await SecureStore.deleteItemAsync(key);
}
export const AuthenticationActions = {
    FIRST_STAGE: 'FIRST_STAGE',
    SECOND_STAGE: 'SECOND_STAGE',
    THIRD_STAGE: 'THIRD_STAGE',
    LOGIN: 'LOGIN',
    AUTHENTICATED: 'AUTHENTICATED',
    RESTORE_AUTH: 'RESTORE_AUTH',
}


const AppNavigator = () => {

    const auth = {
        token: null,
        id: null,
    }
    const [authDetail, setAuthDetails] = useState(auth);
    const startUp = async () => {
        fetch(startUpUrl, {
            method: 'GET'
        })
            .then(async res => {
                await res.json();
                console.log("Backend up and running");
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        const loadAuthDetails = async () => {
            let auth;
            try {
                auth = await getItemFromStore(AuthKey);
            } catch (error) {
                console.log("restore failed ...")
            }
            dispatch({ type: AuthenticationActions.RESTORE_AUTH, token: auth['token'], userId: auth['user']})
        }
        loadAuthDetails();
        startUp();
    },[])
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case AuthenticationActions.FIRST_STAGE:
                    return {
                        ...prevState,
                        username: action.username,
                        email: action.email,
                        password: action.password
                    };
                case AuthenticationActions.SECOND_STAGE:
                    return {
                        ...prevState,
                        firstname: action.firstname,
                        lastname: action.lastname,
                        mobileNumber: action.mobile
                    };
                case AuthenticationActions.THIRD_STAGE:
                    return {
                        ...prevState,
                        profile: action.profilePicture
                    };
                case AuthenticationActions.LOGIN:
                    return {
                        ...prevState,
                        username: action.username,
                        token: action.token,
                        id: action.id
                    }
                case AuthenticationActions.AUTHENTICATED:
                    return {
                        ...prevState,
                        username: '',
                        password: '',
                        firstname: '',
                        lastname: '',
                        email: '',
                        token: action.token,
                        userId: action.userId
                    }
                case AuthenticationActions.RESTORE_AUTH:
                    return {
                        ...prevState,
                        token: action.token,
                        userId: action.userId,
                        authChecked: true
                    }
            }
        },
        {
            username: '',
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            profile: '',
            token: authDetail['token'],
            userId: authDetail['id'],
            authChecked: false,
        },
    );
    const userContext = useMemo(
        () => ({
            firstStage: data => {
                dispatch({ type: AuthenticationActions.FIRST_STAGE, username: data.username, email: data.email, password: data.password });
            },
            secondStage: data => {
                dispatch({ type: AuthenticationActions.SECOND_STAGE, firstname: data.firstname, lastname: data.lastname });
            },
            thirdStage: data => {
                dispatch({ type: AuthenticationActions.THIRD_STAGE, profilePicture: data.profile })
            },
            register: async data => {
                console.log("registrtering user .....")
                const response = await fetch(userRegisterUrl, {
                    body: JSON.stringify(state),
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'POST'
                })
                if (!response.ok) {
                    const errorInfo = await response.json();
                    throw new Error(errorInfo.message);
                }
                const responseData = await response.json();
                console.log("User registered succesfully....");
                return responseData;
            },
            login: async data => {
                    console.log("logging user in .....")
                const response = await fetch(loginUrl, {
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'POST'
                }).catch((err) => {
                    throw new Error(err.message);
                })
                if (!response.ok) {
                    const errorInfo = await response.json();
                    // console.log(errorInfo);
                    throw new Error(errorInfo.message);
                }
                const responseData = await response.json();
                addItemToStore(AuthKey, JSON.stringify(responseData))
                    .then(data => { console.log('Auth added to store') })
                    .catch(err => { console.log(err) });
                dispatch({ type: AuthenticationActions.AUTHENTICATED, token: responseData.token, userId: responseData.userId });
            },
            userDetailsState: state
        }),
        [state]
    );
    if (!state.authChecked) {
        return (
            <View style={styles.container}> 
                <ActivityIndicator size='large' color='#00ff00' />
            </View>
        )
    }
    return (
        <>
            <UserContext.Provider value={userContext}>
               {state.token=== null ? (<AuthStack/>): (<Home/>)}
            </UserContext.Provider>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default AppNavigator;