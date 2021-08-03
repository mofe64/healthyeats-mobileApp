import React,{useState} from 'react';
import { ImageBackground, View, Image, TouchableWithoutFeedback , StyleSheet, Text, Platform, KeyboardAvoidingView, Keyboard} from 'react-native';
const image = require('../../assets/Pattern.png')
const Logo = require('../../assets/Logo.png')
import { greenPrimary } from '../../constants/Colors';
import { primaryFont, primaryFontBold } from '../../constants/Fonts';
import FormInputWithIcon from '../../components/FormInputWithIcon';
import GradientButton from 'react-native-gradient-buttons';

const RegisterScreen = ({navigation}) => {
    const goToLogin = () => {
        navigation.navigate('LOGIN')
    }
    const goToBio = () => {
        navigation.navigate('BIO');
    }
    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
            <ImageBackground source={image} resizeMode={'cover'} style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} />
                    <Text style={styles.logoPrimaryText}>HealthyEats</Text>
                    <Text style={styles.logoSecondaryText}>Deliver Favorite Food</Text>
                </View>
                <Text style={styles.primaryText}>Sign Up For Free</Text>
                <View style={styles.form}>
                    <FormInputWithIcon iconName='person-outline' placeHolder="Username" />
                    <FormInputWithIcon iconName='mail-outline' placeHolder='Email'/>
                    <FormInputWithIcon iconName='lock-closed-outline' placeHolder='Password'/>
                </View>
                <View style={styles.buttonContainer}>
                    <GradientButton
                        style={styles.button}
                        text='Register'
                        gradientBegin="#53E88B"
                        gradientEnd="#15BE77"
                        radius={15}
                        impact
                        onPressAction={goToBio}
                    />
                </View>
                <TouchableWithoutFeedback onPress={goToLogin}>
                    <Text style={ styles.link}>already have an account?</Text>
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