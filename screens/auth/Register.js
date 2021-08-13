import React,{useState, useContext} from 'react';
import { ImageBackground, View, Image, TouchableWithoutFeedback , StyleSheet, Text, Platform, KeyboardAvoidingView, Keyboard} from 'react-native';
const image = require('../../assets/Pattern.png')
const Logo = require('../../assets/Logo.png')
import { greenPrimary } from '../../constants/Colors';
import { primaryFontBold } from '../../constants/Fonts';
import FormInputWithIcon from '../../components/FormInputWithIcon';
import GradientButton from 'react-native-gradient-buttons';
import { UserContext } from '../../util/contextStore';

const RegisterScreen = ({ navigation }) => {
    const { firstStage, userDetailsState } = useContext(UserContext);
    const UserDetails = {
        username: userDetailsState['username'],
        email: userDetailsState['email'],
        password: userDetailsState['password']
    }

    const [userInfo, setUserInfo] = useState(UserDetails);
    const [userNameStatus, setUserNameStatus] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);
    const [passwordStatus, setPasswordStatus] = useState(false);
    const [formValid, setFormValid] = useState(false);

    // console.log(userInfo);
    // console.log(userDetailsState);

    const updateUserDetails = (key, value) => {
        const updatedUserDetails = { ...userInfo };
        updatedUserDetails[key] = value;
        setUserInfo(updatedUserDetails);
    }

    const changeFormValidity = (key, validityStatus) => {
        let userNameValid = userNameStatus;
        let emailValid = emailStatus;
        let passwordValid = passwordStatus;
        if (key === 'username') {
            setUserNameStatus(validityStatus)
            userNameValid = validityStatus;
        }
        if (key === 'email') {
            setEmailStatus(validityStatus)
            emailValid = validityStatus;
        }
        if (key === 'password') {
            setPasswordStatus(validityStatus);
            passwordValid = validityStatus;
        }
        if (userNameValid && emailValid && passwordValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }

    const goToLogin = () => {
        navigation.navigate('LOGIN')
    }
    const goToBio = () => {
        navigation.navigate('BIO');
    }
    const submit = () => {
        userInfo['username'] = userInfo['username'].trim();
        userInfo['email'] = userInfo['email'].trim();
        firstStage(userInfo);
        goToBio();
    }
    
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
            <ImageBackground source={image} resizeMode={'cover'} style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} />
                    <Text style={styles.logoPrimaryText}>HealthyEats</Text>
                    <Text style={styles.logoSecondaryText}>Deliver Favorite Food</Text>
                </View>
                <Text style={styles.primaryText}>Sign Up For Free</Text>
                <View style={styles.form}>
                        <FormInputWithIcon
                            iconName='person-outline'
                            placeHolder="Username"
                            fieldKey='username'
                            updateFunction={updateUserDetails}
                            fieldType='string'
                            formValidityUpdateFunc={changeFormValidity}
                            defaultValue={userInfo['username']}
                        />
                        <FormInputWithIcon
                            iconName='mail-outline'
                            placeHolder='Email'
                            fieldKey='email'
                            updateFunction={updateUserDetails}
                            fieldType='email'
                            formValidityUpdateFunc={changeFormValidity}
                            defaultValue={userInfo['email']}
                        />
                        <FormInputWithIcon
                            iconName='lock-closed-outline'
                            placeHolder='Password'
                            passwordField fieldKey='password'
                            updateFunction={updateUserDetails}
                            fieldType='password'
                            formValidityUpdateFunc={changeFormValidity}
                            defaultValue={userInfo['password']}
                        />
                </View>
                <View style={styles.buttonContainer}>
                    <GradientButton
                        style={styles.button}
                        text='Register'
                        gradientBegin="#53E88B"
                        gradientEnd="#15BE77"
                        radius={15}
                        impact
                        onPressAction={submit}
                        disabledGradientEnd='#D3D3D3'
                        disabled={!formValid}
                    />
                </View>
                <TouchableWithoutFeedback onPress={goToLogin}>
                    <Text style={ styles.link}>already have an account?</Text>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white'
    },
    container: {
        paddingTop: '20%',
        backgroundColor: '#fff',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
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
        width: '100%',
    },
    link: {
        color: greenPrimary,
        textDecorationLine: 'underline',
        textDecorationColor: greenPrimary,
        paddingVertical: 10,
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

export default RegisterScreen