import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React from 'react'

interface props{
    label:string,
    placeholder:string,
    value:string,
    handleChangeText: () => void
}
const FormField = ({label, value, placeholder, handleChangeText}:props) => {
  return (
    <View>
        <Text style={styles.text} >{label}</Text>
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            value={value}
            style={styles.input}
        />
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
        borderColor: '#fefefe',
        backgroundColor:'white',
        height:40,
        borderRadius:6,
        marginBottom:10,
        padding:4
    }

});

export default FormField