import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import OnboardingComponent from './components/Onboarding';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppNavigator from './navigation/AppNavigator';
import { startUpUrl} from './constants/Urls';

import { NavigationContainer } from '@react-navigation/native';
const fetchFonts = () => {
  return Font.loadAsync({
    'BentonSansRegular': require('./assets/fonts/BentonSansRegular.otf'),
    'BentonSansMedium': require('./assets/fonts/BentonSansMedium.otf'),
    'BentonSansBold': require('./assets/fonts/BentonSansBold.otf')
  })
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [onBoarded, setOnBoarded] = useState(false);
 
  const onBoardingComplete = () => {
    setOnBoarded(true);
  }
    if (!dataLoaded) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setDataLoaded(true)}
          onError={(err)=>console.log(err)}
        />
      );
    }
  return (
    <NavigationContainer>
      {!onBoarded && <OnboardingComponent onDoneFunction={onBoardingComplete} />}
      {onBoarded && <AppNavigator/>}
    </NavigationContainer>
    
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
