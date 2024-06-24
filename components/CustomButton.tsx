import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import React from 'react'

import { FontAwesome } from '@expo/vector-icons';

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
        <View style={styles.buttonTextWrapper} >
       <Text style={styles.text} >{title}</Text>
       {(type == 'signout') && <FontAwesome name="sign-out" size={24} color="#ad2524" />}
       </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    text:{
        fontFamily:'Poppins-SemiBold',
        textAlign:'center',
        marginRight:5,
        marginTop:3.5,
    },
    buttonTextWrapper:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    primary:{
        backgroundColor: '#faa21b',
        paddingTop:15,
        paddingBottom:15,
        borderRadius: 12,
        textAlign:'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.40,
        shadowRadius: 4,
        elevation: 4
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
    },
    signout:{
        marginTop:20,
        marginRight:10,
        borderRadius: 8,
        width: 100
    }

});

export default CustomButton