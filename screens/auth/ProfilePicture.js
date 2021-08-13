import React,{useEffect,useState, useContext} from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback,ImageBackground,Image, Alert, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primaryFontBold, primaryFont } from '../../constants/Fonts';
import * as ImagePicker from 'expo-image-picker';
import GradientButton from 'react-native-gradient-buttons';
import { UserContext } from '../../util/contextStore';
import { cloudinaryUploadPreset, cloudinaryUploadUrl} from '../../constants/Urls';

const BackgroundPattern = require('../../assets/MinPattern.png');
const GalleryIcon = require('../../assets/Gallery.png');
const CameraIcon = require('../../assets/Camera.png');

const ProceedButton = ({text, func=f=>f}) => {
    return (
        <GradientButton
            style={styles.button}
            text={text}
            gradientBegin="#53E88B"
            gradientEnd="#15BE77"
            radius={15}
            impact
            onPressAction={func}
        />
    )
}

const ProfilePhotoPicker = ({ navigation }) => {
    const { thirdStage,userDetailsState } = useContext(UserContext);
    const [uploadResult, setUploadResult] = useState(null);
    const [hasUploaded, setHasUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const goBack = () => {
        navigation.goBack();
    };
    console.log(userDetailsState);
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
    const uploadToCloudinary = () => {
        console.log("uploading to cloudinary")
        const result = uploadResult;
        if (result != null) {
            setLoading(true);
            let base64Image = `data:image/jpg;base64,${result.base64}`;
            let data = {
                "file": base64Image,
                "upload_preset": cloudinaryUploadPreset,
                "folder": "healthyEats/profile"
            }
            fetch(cloudinaryUploadUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            }).then(async r => {
                let data = await r.json()
                console.log(data.secure_url);
                const imageData = {
                    profile: data.secure_url,
                }
                thirdStage(imageData);
                setLoading(false);
            })
                .then(() => setHasUploaded(true))
                .catch(err => console.log(err));
        } else {
            Alert.alert(
                    'Image Empty',
                    'Please Upload An Image Before Proceeding',
                    [{text: 'okay', style:'default',onPress: f=>f}]
                )
        }
    }
    const skip = () => {
        navigation.navigate("COMPLETE");
    }

    const completeRegistration = () => {
        uploadToCloudinary();
        // navigation.navigate("COMPLETE");
    }
    const done = () => {
        navigation.navigate("COMPLETE");
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        })
        if (!result.cancelled) {
            setUploadResult(result);
        }
    };

    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            setUploadResult(result);
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
            {loading ? (<ActivityIndicator size='large' color='#00ff00' />) :
                (hasUploaded) ?
                    (
                        <View style={styles.buttonContainer}>
                            <ProceedButton text='Proceed' func={done} />
                        </View>
                    )
                    :
                    (
                        <View style={styles.buttonContainer}>
                            <GradientButton
                                style={styles.button}
                                text='Skip'
                                gradientBegin="#F9A84D"
                                gradientEnd="#DA6317"
                                radius={15}
                                impact
                                onPressAction={skip}
                            />
                            <ProceedButton text='upload' func={completeRegistration} />
                        </View>
                    )
            }
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