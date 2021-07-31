import React from 'react';
import { ImageBackground, View, Image, TouchableWithoutFeedback , StyleSheet} from 'react-native';

const RegisterScreen = ({toggleFunction=f=>f}) => {
    return (
        <View style={styles.container }>
            <Text>Register</Text>
            <TouchableWithoutFeedback
                onPress={toggleFunction}
            >
                <Text>Login</Text>
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

export default RegisterScreen