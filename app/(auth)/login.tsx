import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";

import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser, setIsLoading } from "@/store/store-slices/userSlice";

import { getCurrentUser, signIn } from "@/server/appWriteConfig";


const login = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading]= useState(false);
  const dispatch = useDispatch();

  const submitForm = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      setLoginLoading(false);
    }


    try {
      const signUp = await signIn(form.email, form.password);

      const result = await getCurrentUser();
      dispatch(setIsLoading(true))
      dispatch(setUser(result));
      dispatch(setIsLoggedIn(true));


      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {
      //
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <LogoHeader />

        <View style={styles.formContainer}>
          <Text style={styles.pageTitle}>Login</Text>

          <FormField label="Email" value={form.email} handleChangeText={(e:any) => setForm({ ...form, email: e })} placeholder="Email"/>
          <FormField  label="Password" value={form.password} handleChangeText={(e:any) => setForm({ ...form, password: e })} placeholder="Password"/>
          <CustomButton title="Login" handlePress={submitForm} isLoading={loginLoading} type="primarySingle" />
          <View>
            <Text style={styles.linkWrapper}>
              Don't have an account? 
              <Link href="/sign-up" style={styles.link}>Sign up</Link>
            </Text>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  pageTitle:{
    fontFamily:'Poppins-SemiBold',
    fontSize:24,
    textAlign:'center'
  },
  container:{
    flex: 1
  },
  formContainer:{
    flex:1,
    padding:20
  },
  linkWrapper:{
    textAlign:'center',
    marginTop:10
  },
  link:{
    marginLeft:2,
    color:'#ad2524'
  }

});

export default login;