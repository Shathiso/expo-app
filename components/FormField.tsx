import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, {useState} from 'react'
import { FontAwesome } from '@expo/vector-icons';

interface props{
    label:string,
    placeholder:string,
    value?:any,
    style?: {} | null,
    handleChangeText: (e:any) => void
}
const FormField = ({label, value, placeholder, style, handleChangeText}:props) => {

const [showPassword, setShowPassword]= useState(true);

  return (
    <View>
        <Text style={styles.text} >{label}</Text>
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            value={value}
            style={styles.input}
            secureTextEntry={(placeholder == 'Password' && !showPassword)}
        />
        { (placeholder == 'Password' && showPassword) && <FontAwesome name="eye" size={20} color="#000" style={styles.passwordEyeIcon} onClick={ () => setShowPassword(false)} />}
        { (placeholder == 'Password' && !showPassword) &&<FontAwesome name="eye-slash" size={20} color="#000" style={styles.passwordEyeIcon} onClick={ () => setShowPassword(true)} />}
    </View>
  )
}

const styles = StyleSheet.create({
    text:{
        textAlign:'left',
        marginBottom:5
    },
    primary:{
        backgroundColor: '#faa21b',
        paddingTop:15,
        paddingBottom:15,
        borderRadius: 12,
        textAlign:'center'
    },

    primaryLoading:{
        opacity:0.5,
        backgroundColor: '#faa21b',
        minHeight: 52,
        borderRadius: 12,
    },

    input:{
        borderColor: '#cdcdcd',
        backgroundColor:'white',
        height:40,
        borderRadius:6,
        marginBottom:10,
        paddingTop:5,
        paddingBottom:5,
        paddingRight:15,
        paddingLeft:15,
        borderStyle: 'solid',
        borderWidth: 1
    },
    passwordEyeIcon:{
        position: 'absolute',
        right:10,
        bottom: 20
    }

});

export default FormField