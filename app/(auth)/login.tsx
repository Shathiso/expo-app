import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";

import { useGlobalContext } from "../../store/globalProvider";
import { useToast } from "react-native-toast-notifications";

import { getCurrentUser, signIn } from "@/server/appWriteConfig";
import { globalContextTypes } from "@/typescript_types/types";

const login = () => {

  const toast = useToast();
  const { setIsLoading, setUser, setIsLoggedIn, setIsAdmin }  = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const [loginLoading, setLoginLoading]= useState(false);

  const submitForm = async () => {
    if (form.email === "" || form.password === "") {
      toast.show('Please fill in all fields', {type: "error"});
      setLoginLoading(false);

    } else {

      setIsLoading(true);

      const signingIn = await signIn(form.email, form.password);
      const result = await getCurrentUser();

      if(signingIn.error != '') {
        toast.show('Please check your login details.', {type: "error"});
        setIsLoading(false);
      }

      if(result) {
        setUser({...result});
        setIsLoading(false);
        setIsLoggedIn(true);

        if(result.isAdmin) {
          setIsAdmin(true);
          router.replace("/dashboard")
        } else {
          setIsAdmin(false);
          router.replace("/home")
        }
        
      }
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
              <Text>Don't have an account?</Text>
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
    marginTop:10,
    flexDirection:"row"
  },
  link:{
    marginLeft:4,
    color:'#ad2524'
  }

});

export default login;