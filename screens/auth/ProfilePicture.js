import React,{useEffect} from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback,ImageBackground,Image, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primaryFontBold, primaryFont } from '../../constants/Fonts';
import * as ImagePicker from 'expo-image-picker';
import GradientButton from 'react-native-gradient-buttons';
import { UserContext } from '../../util/contextStore';

const BackgroundPattern = require('../../assets/MinPattern.png');
const GalleryIcon = require('../../assets/Gallery.png');
const CameraIcon = require('../../assets/Camera.png');

const ProfilePhotoPicker = ({ navigation }) => {
    const goBack = () => {
        navigation.goBack();
    };
    const completeRegistration = () => {
        navigation.navigate("COMPLETE");
    }
    const confirmMediaLibraryPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'App requires permission to access media library',
                    [{text: 'okay', style:'default',onPress: goBack}]
                )
            }
        }
    }
    const confirmCameraPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'App requires permission to access Camera',
                    [{text: 'okay', style:'default',onPress: goBack}]
                )
            }
        }
    }
    useEffect(() => {
        confirmMediaLibraryPermissions();
        confirmCameraPermissions();
    }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        console.log(result);
        if (!result.cancelled) {
            console.log("Got here")
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        console.log(result);
        if (!result.cancelled) {
            console.log("Got here")
        }
    }

    return (
        <ImageBackground  source={BackgroundPattern} resizeMode='cover' style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableWithoutFeedback onPress={goBack}>
                    <Ionicons name='chevron-back-outline' size={24} color='#DA6317'/>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.headerText} >
                <Text style={styles.headerTextPrimary}>
                    Upload Your Profile Photo
                </Text>
                <Text style={styles.headerTextSecondary}>This data will be used to build your profile</Text>
            </View>
            <View style={styles.profileSelection}>
                <TouchableWithoutFeedback onPress={pickImage}>
                    <View style={styles.optionCard}>
                        <Image source={GalleryIcon} />
                        <Text style={styles.optionText}> From Gallery</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={takePicture}>
                    <View style={styles.optionCard}>
                        <Image source={CameraIcon} />
                        <Text style={styles.optionText}>Take Photo</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.buttonContainer}>
                <GradientButton
                    style={styles.button}
                    text='Skip'
                    gradientBegin="#F9A84D"
                    gradientEnd="#DA6317"
                    radius={15}
                    impact
                    onPressAction={completeRegistration}
                />
                <GradientButton
                    style={styles.button}
                    text='Next'
                    gradientBegin="#53E88B"
                    gradientEnd="#15BE77"
                    radius={15}
                    impact
                    onPressAction={completeRegistration}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 50,
        paddingHorizontal: 30,
        flex: 1,
        backgroundColor: '#F6F6F6'
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
    profileSelection: {
        width: '100%'
    },
    optionCard: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 130,
        backgroundColor: '#fff',
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.63,
        elevation: 4,
    },
    optionText: {
        marginTop: 10,
        fontFamily: primaryFontBold,
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 250
    },
    button: {
        width: 157,
        height: 57,
    },
})
export default ProfilePhotoPicker;