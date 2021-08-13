import React,{useContext, useState} from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, Alert } from 'react-native';
import {primaryFont, primaryFontBold } from '../../constants/Fonts';
import { greenPrimary } from '../../constants/Colors';
import GradientButton from 'react-native-gradient-buttons';
import { UserContext } from '../../util/contextStore';



const image = require('../../assets/Pattern.png')
const checkMark = require('../../assets/checkMark.png');


const RegistrationComplete = ({navigation}) => {
    const { register } = useContext(UserContext);
    const registerComplete = () => {
        register()
            .then((data) => {
            console.log(data);
            navigation.navigate('LOGIN');
            }).
            catch((err) => {
            Alert.alert(
                'Something Went Wrong',
                err.message,
                [
                    { text: 'Try Again', style: 'default', onPress: register },
                    {text:'Cancel',style:'destructive', onPress: f=>f}
                ]
            )
        })        
    }
    return (
        <ImageBackground source={image} resizeMode='cover' style={styles.container}>
            <View style={styles.content}>
                <Image source={checkMark} style={ styles.check}/>
                <View style={styles.textContainer}>
                    <Text style={styles.primaryText}>Congrats!</Text>
                    <Text style={styles.secondaryText}>Your Profile is Ready To Use</Text>
                </View>
                <GradientButton
                    style={styles.button}
                    text='Proceed'
                    gradientBegin="#53E88B"
                    gradientEnd="#15BE77"
                    radius={15}
                    impact
                    onPressAction={registerComplete}
                />
            </View>
             
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        width: '100%'
    },
    content: {
        height: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    check: {
        width: 172,
        height: 162,
    },
    textContainer: {
        paddingVertical: 30,
        alignItems: 'center',
    },
    primaryText: {
        fontFamily: primaryFontBold,
        fontSize: 39,
        color: greenPrimary,
        marginVertical: 10
    },
    secondaryText: {
        fontFamily: primaryFontBold,
        fontSize: 30
    },
    button: {
        position: 'absolute',
        bottom: 0,
        width: 157,
        height: 57,
    }

})


export default RegistrationComplete;