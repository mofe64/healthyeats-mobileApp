import React,{useContext, useState} from 'react';
import { ImageBackground, View, Image, Text, TouchableWithoutFeedback, StyleSheet, Platform,Keyboard, Alert } from 'react-native';
const image = require('../../assets/Pattern.png')
const Logo = require('../../assets/Logo.png')
import { greenPrimary } from '../../constants/Colors';
import { primaryFont, primaryFontBold } from '../../constants/Fonts';
import FormInputWithIcon from '../../components/FormInputWithIcon';
import GradientButton from 'react-native-gradient-buttons';
import {UserContext } from '../../util/contextStore';
import { ApplicationError } from '../../util/ApplicationError';
const LoginScreen = ({ navigation }) => {
    const { login } = useContext(UserContext);
    const goToRegister = () => {
        navigation.navigate('REGISTER')
    }
    const loginDefaultDetails = {
        username: '',
        password: '',
    }
    const [loginDetails, setLoginDetails] = useState(loginDefaultDetails);
    const [userNameStatus, setUserNameStatus] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const updateLoginDetails = (key, value) => {
        const updatedLoginDetiails = { ...loginDetails };
        updatedLoginDetiails[key] = value;
        setLoginDetails(updatedLoginDetiails);
    }

    const changeFormValidity = (key, validityStatus) => {
        let userNameValid = userNameStatus;
        let passwordValid = passwordStatus;
        if (key === 'username') {
            setUserNameStatus(validityStatus)
            userNameValid = validityStatus;
        }
        if (key === 'password') {
            setPasswordStatus(validityStatus);
            passwordValid = validityStatus;
        }
        if (userNameValid && passwordValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }
    const submit = () => {
       const details = {
            ...loginDetails,
            username: loginDetails['username'].trim(),
        }
        login(details)
            .then((data) => console.log(data))
            .catch((err) => {
                Alert.alert(
                    'Something Went Wrong',
                    err.message,
                    [
                        {text:'Try Again',style:'default',onPress:() => {login(loginDetails)}},
                        {text:'Cancel',style:'destructive',onPress: f=>f}
                    ]
                )
            })  
        
    }
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
            <ImageBackground source={image} resizeMode={'cover'} style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} />
                    <Text style={styles.logoPrimaryText}>HealthyEats</Text>
                    <Text style={styles.logoSecondaryText}>Deliver Favorite Food</Text>
                </View>
                <Text style={styles.primaryText}>Login To Your Account</Text>
                <View style={styles.form}>
                    <FormInputWithIcon
                        iconName='person-outline'
                        placeHolder='Username'
                        fieldKey='username'
                        updateFunction={updateLoginDetails}
                        fieldType='string'
                        defaultValue={loginDetails['username']}
                        formValidityUpdateFunc={changeFormValidity}
                    />
                    <FormInputWithIcon
                        iconName='lock-closed-outline'
                        placeHolder='Password'
                        passwordField
                        fieldKey='password'
                        updateFunction={updateLoginDetails}
                        fieldType='password'
                        defaultValue={loginDetails['password']}
                        formValidityUpdateFunc={changeFormValidity}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <GradientButton
                        style={styles.button}
                        text='Login'
                        gradientBegin="#53E88B"
                        gradientEnd="#15BE77"
                        radius={15}
                        impact
                        onPressAction={submit}
                        disabledGradientEnd='#D3D3D3'
                        disabled={!formValid}
                    />
                </View>
                <TouchableWithoutFeedback>
                    <Text style={styles.link} >Forgot Your Password?</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={goToRegister}>
                    <Text style={styles.link}>Create An Account?</Text>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: '20%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    logoPrimaryText: {
        color: greenPrimary,
        fontSize: 40,
        fontFamily: primaryFontBold
    },
    logoSecondaryText: {
        fontSize: 18
    },
    primaryText: {
        fontFamily: primaryFontBold,
        fontSize: 30
    },
    form: {
        marginTop: 10,
        width: '100%'
    },
    link: {
        color: greenPrimary,
        textDecorationLine: 'underline',
        textDecorationColor: greenPrimary,
        paddingVertical: 5,
        fontSize: 16
    },
    buttonContainer: {
        marginVertical: 10
    },
    button: {
        width: 157,
        height: 57,
    },
});

export default LoginScreen;