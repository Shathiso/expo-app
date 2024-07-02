import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";

import { useGlobalContext } from "../../store/globalProvider";
import { registerUser } from '../../server/appWriteConfig.js'

const signUp = () => {

  const { setIsLoading, setUser, setIsLoggedIn, setIsAdmin } = useGlobalContext();
  const [form, setForm] = useState({
    name:"",
    email: "",
    mobile: "",
    password: "",
  });
  const [signUpLoading, setSignUpLoading]= useState(false);

  const submitForm = async () => {
    setSignUpLoading(true);
    setIsLoading(true);

    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      setSignUpLoading(false);
    }

    try {
      const result = await registerUser(form);
      setUser(result);
      setIsAdmin(false);
      setIsLoggedIn(true);
      router.replace("/home");
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <LogoHeader />
        <View style={styles.formContainer}>
          <Text style={styles.pageTitle}>Sign Up</Text>

          <FormField label="Name" value={form.name} handleChangeText={(e:any) => setForm({ ...form, name: e })} placeholder="Name"/>
          <FormField label="Email" value={form.email} handleChangeText={(e:any) => setForm({ ...form, email: e })} placeholder="Email"/>
          <FormField label="Mobile" value={form.mobile} handleChangeText={(e:any) => setForm({ ...form, mobile: e })} placeholder="Mobile"/>
          <FormField  label="Password" value={form.password} handleChangeText={(e:any) => setForm({ ...form, password: e })} placeholder="Password"/>
          <CustomButton title="Sign Up" handlePress={submitForm} isLoading={signUpLoading} type="primarySingle" />
          <View>
            <Text style={styles.linkWrapper}>
              Already have an account? 
              <Link href="/login" style={styles.link}>Login</Link>
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

export default signUp;