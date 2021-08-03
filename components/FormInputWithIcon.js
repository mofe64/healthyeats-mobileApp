import React,{useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { greenPrimary } from '../constants/Colors'
import { primaryFont, primaryFontBold } from '../constants/Fonts';

const FormInputWithIcon = ({ iconName = 'person-outline', size = 24, color = greenPrimary, placeHolder='input'}) => {
    const [value, setValue] = useState('');

    return (
        <View  style={styles.formInputContainer}>
            <Ionicons name={iconName} size={size} color={color}/>
            <TextInput
                style={styles.formInput}
                value={value}
                onChangeText={setValue}
                placeholder={placeHolder}
            />
        </View>
    )
}

const styles = StyleSheet.create({
     formInputContainer: {
        flexDirection: 'row',
        height: 40,
        margin: 12,
        borderColor: greenPrimary,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        height: 57
    },
    formInput: {
        width: '80%',
        paddingLeft: 10
    }
})

export default FormInputWithIcon;