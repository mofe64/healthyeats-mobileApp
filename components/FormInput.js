import React,{useState} from 'react';
import { View, TextInput, StyleSheet ,Text} from 'react-native';
import { greenPrimary } from '../constants/Colors'
import validator from 'validator';

const FormInput = ({
    placeHolder = 'input',
    passwordField = false,
    defaultValue='',
    updateFunction,
    fieldType,
    fieldKey = '',
    formValidityUpdateFunc=f=>f,
}) => {
    const [value, setValue] = useState(defaultValue);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const updateValue = (newValue = '', key) => {
        setHasError(false);
        if (fieldType === 'string') {
            if (newValue.length < 3) {
                setHasError(true);
                const fieldName = fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
                setErrorMessage(`${fieldName} cannot be less than 3 characters`)
                formValidityUpdateFunc(fieldKey, false);
            } else {
                formValidityUpdateFunc(fieldKey, true)
            }
        }
        if (fieldType === 'email') {
            const emailValid = validator.isEmail(newValue);
            if (!emailValid) {
                setHasError(true);
                setErrorMessage("Email address provided is not valid")
                formValidityUpdateFunc(fieldKey, false);
            } else {
                formValidityUpdateFunc(fieldKey, true);
            }
        }
        if (fieldType === 'password') {
            if (newValue.length < 8) {
                setHasError(true);
                const fieldName = fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
                setErrorMessage(`${fieldName} cannot be less than 8 characters`)
                formValidityUpdateFunc(fieldKey, false);
            } else {
                formValidityUpdateFunc(fieldKey, true);
            }
        }
        updateFunction(key, newValue);
        setValue(newValue);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.formInput}
                value={value}
                onChangeText={(e)=> {updateValue(e, fieldKey)}}
                placeholder={placeHolder}
                secureTextEntry={passwordField}
            />
            <View style={styles.errorMessageContainer}>
                {hasError && <Text style={styles.errorText}>{ errorMessage }</Text> }
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{},
    formInput: {
        paddingLeft: 20,
        width: 347,
        height: 61,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: greenPrimary,
        marginVertical: 10,
    },
    errorMessageContainer: {
        marginTop: -7,
        paddingLeft: 20
    },
    errorText: {
        color: 'red'
    }

})

export default FormInput;