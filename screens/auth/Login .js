import React from 'react';
import { ImageBackground, View, Image, Text ,TouchableWithoutFeedback, StyleSheet} from 'react-native';

const LoginScreen = ({toggleFunction=f=>f}) => {
    return (
        <View style={styles.container}>
            <Text>Log in</Text>
            <TouchableWithoutFeedback
                onPress={toggleFunction}
            >
                <Text>Register</Text>
            </TouchableWithoutFeedback>
        </View>

    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoginScreen;