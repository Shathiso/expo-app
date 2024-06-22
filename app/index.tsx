import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/store/store-slices/userSlice";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '@/components/CustomButton';
import LogoHeader from "@/components/LogoHeader";
import { State } from "@/typescript_types/types";
import Loader from "@/components/Loader";

export default function Welcome() {

  const dispatch = useDispatch();
  const loading = useSelector((state:State) => state.userDetails.isLoading)
  const isLoggedIn = useSelector((state:State) => state.userDetails.isLoggedIn)


  if (!loading && isLoggedIn) return <Redirect href="/home" />;

  const [signUpLoading,setSignUpLoading] = useState(false);
  const [loginLoading,setLoginLoading] = useState(false);
  const [age,setAge] = useState('');

  const testDropDown = ['test','test1'];
  
  const login = () => {
    router.push('/login')
  }

  const signUp = () => {
    router.push('/sign-up')
  }
  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <LogoHeader />
      
      <View style={styles.mainImageContainer}>
        <Image
            style={styles.mainImage}
            source={require('@/assets/images/slideshow/slide-1-resized.jpg')}
            resizeMode='contain'
          />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text>
          Botswana Housing Corporation is a parastatal under the Ministry of Transport and Public Works. 
        </Text>
        <Text>
          Botswana Housing Corporation is a parastatal under the Ministry of Transport and Public Works. 
        </Text>

        
      </View>
      <View style={styles.contentContainer}>
          <CustomButton type="primary" handlePress={signUp} isLoading={loginLoading} title="Sign Up"/>
          <CustomButton type="primary" handlePress={login} isLoading={signUpLoading} title="Login"/>
      </View>
      <StatusBar backgroundColor="#161622" style="dark" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex:1
  },
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
  mainImageContainer:{
    flex:1,
    maxHeight:185,
    marginBottom:50
  },

  mainImage:{
    position:'absolute',
    left:0,
    top:0,
    height: 185,
    width:400
  },
  contentContainer:{
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
  title:{
    fontSize:18
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
 
});

