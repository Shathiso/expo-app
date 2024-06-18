import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface props{
    title:string
    handlePress: () => void,
    isLoading: boolean,
    type: string
}
const CustomButton = ({title, isLoading, type, handlePress}:props) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={ isLoading ? styles[`${type}Loading`] : styles[type]}
        disabled={isLoading}
    >
       <Text style={styles.text} >{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    text:{
        textAlign:'center'
    },
    primary:{
        backgroundColor: '#faa21b',
        paddingTop:15,
        paddingBottom:15,
        borderRadius: 12,
        textAlign:'center',
    },

    primarySingle:{
        backgroundColor: '#faa21b',
        paddingTop:15,
        paddingBottom:15,
        borderRadius: 12,
        textAlign:'center',
        marginTop:30
    },

    primaryLoading:{
        opacity:0.5,
        backgroundColor: '#faa21b',
        minHeight: 52,
        borderRadius: 12,
        marginTop:30
    }

});

export default CustomButton