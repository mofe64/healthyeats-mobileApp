import React,{useState} from 'react';
import { View, StyleSheet, Text,KeyboardAvoidingView,TouchableWithoutFeedback, TextInput, ImageBackground, Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primaryFontBold, primaryFont } from '../../constants/Fonts';
import { greenPrimary } from '../../constants/Colors';
import GradientButton from 'react-native-gradient-buttons';


const BackgroundPattern = require('../../assets/MinPattern.png');

const BioForm = ({ navigation }) => {
    const goBack = () => {
        navigation.goBack();
    };
    const goToProfilePicker = () => {
        navigation.navigate('PROFILEPICTURE');
    }
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumeber] = useState('');
    
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                <ImageBackground source={BackgroundPattern} resizeMode='cover' style={styles.container}>
                    <View style={styles.backButtonContainer}>
                        <TouchableWithoutFeedback onPress={goBack}>
                            <Ionicons name='chevron-back-outline' size={24} color='#DA6317'/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.headerText} >
                        <Text style={styles.headerTextPrimary}>
                            Fill in your bio to get started
                        </Text>
                        <Text style={styles.headerTextSecondary}>This data will be used to build your profile</Text>
                    </View>
                    <View style={styles.form}>
                        <TextInput style={styles.formInput} placeholder='First Name' value={firstName} onChange={setFirstName }/>
                        <TextInput style={styles.formInput} placeholder='Last Name'value={lastName} onChangeText={setLastName} />
                        <TextInput style={styles.formInput} placeholder='Mobile Number' value={mobileNumber} onChangeText={setMobileNumeber} keyboardType='number-pad' />
                    </View>
                    <View style={styles.buttonContainer}>
                        <GradientButton
                            style={styles.button}
                            text='Next'
                            gradientBegin="#53E88B"
                            gradientEnd="#15BE77"
                            radius={15}
                            impact
                            onPressAction={goToProfilePicker}
                        />
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 30,

    },
    container: {
        width: '100%',
        flex: 1
    },
    backButtonContainer: {
        marginTop: 20,
        backgroundColor: "rgba(245,212,190,255)",
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    headerText: {
        textAlign: 'center',
        width: '90%',
    },
    headerTextPrimary: {
        fontFamily: primaryFontBold,
        fontSize: 30,
        marginVertical: 10
    },
    headerTextSecondary: {
        marginVertical: 10,
        fontFamily: primaryFont,
        fontSize: 20
        
    },
    form: {
        marginTop: 20,
        width: '100%',
    },
    formInputContainer: {
        width:'100%',
    },
    formInput: {
        paddingLeft: 10,
        width: 347,
        height: 61,
        borderWidth: .5,
        borderRadius: 15,
        borderColor: greenPrimary,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.63,
        elevation: 4,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250
    },
    button: {
        width: 157,
        height: 57,
    },
})
export default BioForm;