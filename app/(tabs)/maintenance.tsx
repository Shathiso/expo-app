import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";
import DropDown from "@/components/DropDown";

import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUser } from "@/store/store-slices/userSlice";

import { registerUser } from '../../server/appWriteConfig.js'

const maintenance = () => {

  const [form, setForm] = useState({
    name:"",
    plotNumber: "",
    mobile:"",
    email:"",
    typeOfProblem:"",
    description:"",
    picture:''
  });

  const typeOfProblemOptions = ['plumbing', 'electrical', 'carpentry'];

  const [signUpLoading, setSignUpLoading]= useState(false);
  const dispatch = useDispatch();

  const submitForm = async () => {
    setSignUpLoading(true)
    if (form.name === "" || form.email === "" || form.typeOfProblem === "") {
      Alert.alert("Error", "Please fill in all fields");
      setSignUpLoading(false);
    }

    try {
      const result = await registerUser(form);
      dispatch(setUser(result));
      dispatch(setIsLoggedIn(true));
      router.replace("/home");
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {
      //setSignUpLoading(false);
      //setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader />
        <View style={styles.formContainer}>
          <Text style={styles.pageTitle}>Maintenance</Text>
          <Text style={styles.pageDescription}>Fill in the form below to send a report to our maintenance department about any problems in your rented BHC house </Text>

          <FormField label="Name" value={form.name} handleChangeText={(e:any) => setForm({ ...form, name: e })} placeholder="eg. Tshepo Modise"/>
          <FormField label="Plot Number" value={form.plotNumber} handleChangeText={(e:any) => setForm({ ...form, plotNumber: e })} placeholder="eg. Plot 234, Tlokweng"/>
          <FormField  label="Mobile Number" value={form.mobile} handleChangeText={(e:any) => setForm({ ...form, mobile: e })} placeholder="eg. 72812345"/>
          <FormField  label="Email" value={form.email} handleChangeText={(e:any) => setForm({ ...form, email: e })} placeholder="eg. tshepo@gmail.com"/>
          <DropDown dropDownTitle="Type of problem?" listData={typeOfProblemOptions} handleSelection={(e:any) => setForm({ ...form, typeOfProblem: e })} />
          <FormField  label="Description" value={form.description} handleChangeText={(e:any) => setForm({ ...form, description: e })} placeholder="eg. Water Leak"/>
          <FormField  label="Picture" value={form.picture} handleChangeText={(e:any) => setForm({ ...form, picture: e })} placeholder=""/>  
          <CustomButton title="Submit" handlePress={submitForm} isLoading={signUpLoading} type="primarySingle" />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safeAreaView:{
    height: '100%'
  },
  pageTitle:{
    fontFamily:'Poppins-SemiBold',
    fontSize:24,
    textAlign:'center'
  },
  pageDescription:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'left',
    marginTop:10,
    marginBottom: 16
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

export default maintenance;