import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'

const LogoHeader = () => {
  return (
    <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode='contain'
            />
  </View>
  )
}

const styles = StyleSheet.create({
    logoContainer:{
      backgroundColor:'white',
      width: 400,
      maxHeight:60,
      height: 60,
      flex:1
    },
    logo:{
      width:100,
      height:60
    },
});

export default LogoHeader