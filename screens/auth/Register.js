import React,{useState} from 'react';
import { ImageBackground, View, Image, TouchableWithoutFeedback , StyleSheet, Text, Platform, KeyboardAvoidingView, Keyboard} from 'react-native';
const image = require('../../assets/Pattern.png')
const Logo = require('../../assets/Logo.png')
import { greenPrimary } from '../../constants/Colors';
import { primaryFont, primaryFontBold } from '../../constants/Fonts';
import FormInput from '../../components/FormInput';
const RegisterScreen = ({ toggleFunction = f => f }) => {

    return (
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
            <ImageBackground source={image} resizeMode={'cover'} style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={Logo} />
                    <Text style={styles.logoPrimaryText}>HealthyEats</Text>
                    <Text style={styles.logoSecondaryText}>Deliver Favorite Food</Text>
                </View>
                <Text style={styles.primaryText}>Sign Up For Free</Text>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"} 
                >
                    <View style={styles.form}>
                        <FormInput iconName='person-outline' placeHolder="Username" />
                        <FormInput iconName='mail-outline' placeHolder='Email'/>
                        <FormInput iconName='lock-closed-outline' placeHolder='Password'/>
                    </View>
                </KeyboardAvoidingView>
                <TouchableWithoutFeedback onPress={toggleFunction}>
                    <Text>already have an account?</Text>
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
});

export default RegisterScreen