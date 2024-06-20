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

const applications = () => {

  const [form, setForm] = useState({
    name:"",
    nationality: "",
    postalAddress: "",
    mobile:"",
    email:"",
    previousOwner:"",
    houseType:"",
    bedrooms:""
  });

  const previousOwnerOptions = ['Yes', 'No'];
  const houseTypeOptions = ['Stand Alone', 'Town House', 'Flat/Apartment'];
  const bedroomOptions = ['1 bedroom', '2 bedroom', '3 bedroom'];

  const [signUpLoading, setSignUpLoading]= useState(false);
  const dispatch = useDispatch();

  const submitForm = async () => {
    setSignUpLoading(true)
    if (form.name === "" || form.email === "" || form.previousOwner === "") {
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
          <Text style={styles.pageTitle}>Applications</Text>
          <Text style={styles.pageDescription}>We hope we can assist you in finding your new home. We ask that you provide your details so that find you a new home. </Text>

          <FormField label="Name" value={form.name} handleChangeText={(e:any) => setForm({ ...form, name: e })} placeholder="eg. Tshepo Modise"/>
          <FormField label="Nationality" value={form.nationality} handleChangeText={(e:any) => setForm({ ...form, nationality: e })} placeholder="eg. Motswana"/>
          <FormField  label="Postal Address" value={form.postalAddress} handleChangeText={(e:any) => setForm({ ...form, postalAddress: e })} placeholder="eg PO Box 277 Tlokweng"/>
          <FormField  label="Mobile Number" value={form.mobile} handleChangeText={(e:any) => setForm({ ...form, mobile: e })} placeholder="eg. 72812345"/>
          <FormField  label="Email" value={form.email} handleChangeText={(e:any) => setForm({ ...form, email: e })} placeholder="eg. tshepo@gmail.com"/>
          <DropDown dropDownTitle="Previous Owner?" listData={previousOwnerOptions} handleSelection={(e:any) => setForm({ ...form, previousOwner: e })} />
          <DropDown dropDownTitle="House Type?" listData={houseTypeOptions} handleSelection={(e:any) => setForm({ ...form, houseType: e })} />
          <DropDown dropDownTitle="Number of Bedrooms?" listData={bedroomOptions} handleSelection={(e:any) => setForm({ ...form, bedrooms: e })} />
          <CustomButton title="Apply" handlePress={submitForm} isLoading={signUpLoading} type="primarySingle" />
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

export default applications;