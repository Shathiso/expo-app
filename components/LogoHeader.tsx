import { View, Text, StyleSheet, Image} from 'react-native'
import { Link, router, Redirect } from "expo-router";
import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '@/store/store-slices/userSlice';
import { signOut } from '@/server/appWriteConfig';


import { State } from '../typescript_types/types'
import CustomButton from './CustomButton';


const LogoHeader = () => {
  const isLoggedIn = useSelector((state:State) => state.userDetails.isLoggedIn)
  const currentUser = useSelector((state:State) => state.userDetails.user)
  const isLoading = useSelector((state:State) => state.userDetails.isLoading)

  const dispatch = useDispatch();

  const signout = async () => {
    console.log('signing out')
    try {
      const signedOut = await signOut();

      if(signedOut){
        dispatch(logOut());
      }
      
    } catch (error) {
      console.log(error)
    }
    finally{
      <Redirect href="/login" />
    }
 
  }

  return (
    <View style={styles.logoContainer}>
      <Link href="/home" style={styles.linkContainer}>
        <Image source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode='contain'
            />
      </Link>
      <View >
        {(isLoggedIn && currentUser) && 
        <View style={styles.userSectionContainer}>
        <CustomButton type="signout" handlePress={signout} isLoading={isLoading} title="Sign Out"/>
        </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    linkContainer:{
      flex:1,
      maxWidth:100
    },
    logoContainer:{
      display: 'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'white',
      width: 400,
      maxHeight:60,
      height: 60,
      flex:1
    },
    userSectionContainer:{
      display: 'flex',
      flexDirection:'row',
      zIndex:5,
      marginTop:20,
      marginRight:10
    },
    logo:{
      width:100,
      height:60
    },
    avatar:{
      width:40,
      height:40,
      borderRadius:40,
      marginTop:12,
      marginRight:5
    }
});

export default LogoHeader