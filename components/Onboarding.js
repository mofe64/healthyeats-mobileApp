import React,{ useRef } from 'react';
import {Image,View,StyleSheet,Text,Button,TouchableNativeFeedback } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import GradientButton from 'react-native-gradient-buttons';


const OnBoardingText = ({primary, secondary}) => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.primaryText}>
                {primary}
            </Text>
            <Text style={styles.secondaryText}>
                {secondary}
            </Text>
        </View>
    )
}
// background: linear-gradient(98.81deg, #53E88B -0.82%, #15BE77 101.53%);

const OnBoardingButton = ({ text, pressFunction=f=>f }) => {
    return (
        <TouchableNativeFeedback>
            <View style={styles.buttonContainer}>
                <GradientButton
                    style={styles.button}
                    text={text}
                    gradientBegin="#53E88B"
                    gradientEnd="#15BE77"
                    radius={15}
                    impact
                    onPressAction={pressFunction}
                />
            </View>    
        </TouchableNativeFeedback>
    );
}

const OnboardingComponent = ({onDoneFunction=f=>f}) => {
    const sliderRef = useRef();
    const next = () => {
        sliderRef.current.goNext();
    }
    return(
        <Onboarding
            onDone={() => { console.log("test"); onDoneFunction() }}
            ref={sliderRef}
            titleStyles={styles.primaryText}
            bottomBarHeight={40}
            bottomBarColor='transparent'
            bottomBarHighlight={false}
            showSkip={false}
            showDone={false}
            showNext={false}
            imageContainerStyles={styles.imageContainer}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: <Image source={require('../assets/onboardingScreenOne.jpg')} style={styles.image} />,
                    title: <OnBoardingText primary='Healthy Food doesn"t have to make you sad' secondary='Here You Can find a chef or dish for every taste and color. Enjoy!'/>,
                    subtitle: <OnBoardingButton text='Next' pressFunction={next}/>
                },
                {
                    backgroundColor: "#fff",
                    image: <Image source={require('../assets/onboardingScreeenTwo.jpg')} style={styles.image} />,
                    title: <OnBoardingText primary='The Meals You love, at the touch of a button' secondary='Here You Can find a chef or dish for every taste and color. Enjoy!'/>,
                    subtitle: <OnBoardingButton text="Done" pressFunction={onDoneFunction} />
                }
            ]}
        />)
}

const styles = StyleSheet.create({
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    primaryText: {
        fontFamily:'BentonSansBold',
        paddingBottom: 15,
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
        paddingHorizontal: 10
    },
    secondaryText: {
        fontFamily:'BentonSansRegular',
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal:30
    },
    imageContainer: {
        marginBottom: 30,
        marginTop: 30,
        paddingBottom:0,
        backgroundColor: 'red',
        width: '100%',
        height: '50%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {
        marginVertical: 20
    },
    button: {
        width: 157,
        height: 57,
    },

})

export default OnboardingComponent;