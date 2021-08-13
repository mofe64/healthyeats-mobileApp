import React,{useState, useContext} from 'react';
import { View, StyleSheet, Text,KeyboardAvoidingView,TouchableWithoutFeedback, ImageBackground, Keyboard} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primaryFontBold, primaryFont } from '../../constants/Fonts';
import { greenPrimary } from '../../constants/Colors';
import GradientButton from 'react-native-gradient-buttons';
import FormInput from '../../components/FormInput';
import { UserContext } from '../../util/contextStore';


const BackgroundPattern = require('../../assets/MinPattern.png');

const BioForm = ({ navigation }) => {
    const { secondStage, userDetailsState } = useContext(UserContext);
    const starterDetails = {
        firstname: userDetailsState['firstname'],
        lastname: userDetailsState['lastname'],
    }
    const [details, setDetails] = useState(starterDetails);
    const [firstnameStatus, setFirstNameStatus] = useState(false);
    const [lastnameStatus, setLastNameStatus] = useState(false);
    const [formValid, setFormValid] = useState(false);

    // console.log(userDetailsState);

    const updateDetails = (key, value) => {
        const updatedDetails = { ...details };
        updatedDetails[key] = value;
        setDetails(updatedDetails);
    }

    const changeFormValidity = (key, validityStatus) => {
        let firstNameValid = firstnameStatus;
        let lastNameValid = lastnameStatus;
        if (key === 'firstname') {
            setFirstNameStatus(validityStatus)
            firstNameValid = validityStatus
        }
        if (key === 'lastname') {
            setLastNameStatus(validityStatus);
            lastNameValid = validityStatus;
        }

        if (firstNameValid && lastNameValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }
    const goBack = () => {
        navigation.goBack();
    };
    const goToProfilePicker = () => {
        navigation.navigate('PROFILEPICTURE');
    }

    const submit = () => {
        details['firstname'] = details['firstname'].trim();
        details['lastname'] = details['lastname'].trim();
        secondStage(details);
        goToProfilePicker();
    }
    
    return (
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
                        <FormInput
                            updateFunction={updateDetails}
                            fieldType='string'
                            fieldKey='firstname'
                            placeHolder='Firstname'
                            formValidityUpdateFunc={changeFormValidity}
                            defaultValue={details['firstname']}
                        />
                        <FormInput
                            updateFunction={updateDetails}
                            fieldType='string'
                            fieldKey='lastname'
                            placeHolder='Lastname'
                            formValidityUpdateFunc={changeFormValidity}
                            defaultValue={details['lastname']}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <GradientButton
                            style={styles.button}
                            text='Next'
                            gradientBegin="#53E88B"
                            gradientEnd="#15BE77"
                            radius={15}
                            impact
                            disabled={!formValid}
                            onPressAction={submit}
                            
                        />
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        paddingVertical: 50,
        paddingHorizontal: 30,
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
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 85,
        left: 30,
    },
    button: {
        width: 157,
        height: 57,

    },
})
export default BioForm;