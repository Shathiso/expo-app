import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, FlatList } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";
import DropDown from "@/components/DropDown";
import FaultItem from "@/components/FaultItem";

import { useToast } from "react-native-toast-notifications";  

import { useDispatch, useSelector } from "react-redux";
import { setStoreFaults } from "@/store/store-slices/userSlice";
import EmptyState from "@/components/EmptyState";
import { submitFault, getUserFaults } from '../../server/appWriteConfig.js'

import { State } from "@/typescript_types/types.js";
import { setIsLoading } from "@/store/store-slices/userSlice";

const maintenance = () => {

  const [form, setForm] = useState({
    plotNumber: "",
    type:"",
    description:"",
    picture:''
  });
  const [faults, setFaults] = useState([]);
  const isLoading = useSelector((state:State) => state.userDetails.isLoading)
  const [signUpLoading, setSignUpLoading]= useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(setIsLoading(true));
    const retrievedFaults = getUserFaults();
    retrievedFaults.then((response) => {
      setFaults([...response])
      console.log(faults)
    }).finally(() => dispatch(setIsLoading(false)))
  }, []);

  const typeOfProblemOptions = ['plumbing', 'electrical', 'carpentry'];



  const submitForm = async () => {
    setSignUpLoading(true)
    dispatch(setIsLoading(true));
    if (form.plotNumber === "" || form.description === "" || form.typeOfProblem === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    try {
      const result = await submitFault(form);
      dispatch(setStoreFaults(result));
      toast.show('Fault submitted successfully.. Expect to be assisted within the next 14 days.',{
        type: "success",
      });

      clearForm();
      dispatch(setIsLoading(false));
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {

    }
  }

  const clearForm = () => {
    setForm({
      plotNumber: "",
      type:"",
      description:"",
      picture:''
    })
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader />

        {(faults.length > 0 && !isLoading) && <FlatList
        data={faults}
        renderItem={({item}) => <View><FaultItem referenceNo={item.referenceNo} faultType={item.faultType} /></View>}
        keyExtractor={item => item.$id}
        ListHeaderComponent={() => (
          <View>
            <View>
                <Text style={styles.pageTitle}>
                  Your Reported Faults
                </Text>
                <Text style={styles.faultDescription}>
                  This is a list of your previous faults.
                </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Reported Faults" subtitle="You have not submitted any faults" />
        )}
      /> }

        {!isLoading && <View style={styles.formContainer}>
          <Text style={styles.pageTitle}>Maintenance</Text>
          <Text style={styles.pageDescription}>Fill in the form below to send a report to our maintenance department about any problems in your BHC house </Text>

          <FormField label="Plot Number" value={form.plotNumber} handleChangeText={(e:any) => setForm({ ...form, plotNumber: e })} placeholder="eg. Plot 234, Tlokweng"/>
          <DropDown dropDownTitle="Type of problem?" listData={typeOfProblemOptions} handleSelection={(e:any) => setForm({ ...form, type: e })} />
          <FormField  label="Description" value={form.description} handleChangeText={(e:any) => setForm({ ...form, description: e })} placeholder="eg. Water Leak"/>
          <FormField  label="Picture" value={form.picture} handleChangeText={(e:any) => setForm({ ...form, picture: e })} placeholder=""/>  
          <CustomButton title="Submit" handlePress={submitForm} isLoading={signUpLoading} type="primarySingle" />
        </View>}
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
  },
  faultTitle:{
    fontFamily:'Poppins-SemiBold',
    fontSize:18,
    marginTop:24,
    textAlign:'center'
  },
  faultDescription:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'center',
    marginTop:10,
    marginBottom: 16
  }

});

export default maintenance;