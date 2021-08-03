import React from 'react';
import { ImageBackground, View, Image, Text, TouchableWithoutFeedback, StyleSheet, Platform,Keyboard } from 'react-native';
const image = require('../../assets/Pattern.png')
const Logo = require('../../assets/Logo.png')
import { greenPrimary } from '../../constants/Colors';
import { primaryFont, primaryFontBold } from '../../constants/Fonts';
import FormInputWithIcon from '../../components/FormInputWithIcon';
import GradientButton from 'react-native-gradient-buttons';

const LoginScreen = ({ navigation }) => {
    const goToRegister = () => {
        navigation.navigate('REGISTER')
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
                    <FormInputWithIcon iconName='person-outline' placeHolder='Username'/>
                    <FormInputWithIcon iconName='lock-closed-outline' placeHolder='Password'/>
                </View>
                <View style={styles.buttonContainer}>
                    <GradientButton
                        style={styles.button}
                        text='Login'
                        gradientBegin="#53E88B"
                        gradientEnd="#15BE77"
                        radius={15}
                        impact
                        onPressAction={()=>{console.log("login")}}
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