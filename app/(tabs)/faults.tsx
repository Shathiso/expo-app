import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";
import DropDown from "@/components/DropDown";
import FaultItem from "@/components/FaultItem";
import { FontAwesome } from '@expo/vector-icons';

import { useToast } from "react-native-toast-notifications";  

import EmptyState from "@/components/EmptyState";
import * as DocumentPicker from "expo-document-picker";
import { submitFault, getUserFaults } from '../../server/appWriteConfig.js'

import { State } from "@/typescript_types/types.js";
import { useGlobalContext } from "../../store/globalProvider";

const faults = () => {

  const [form, setForm] = useState({
    plotNumber: "",
    type:"",
    description:"",
    image:null
  });
  const [faults, setFaults] = useState([]);
  const {isLoading, setIsLoading} = useGlobalContext();
  const [signUpLoading, setSignUpLoading]= useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async() => {
    setIsLoading(true);
    const retrievedFaults = getUserFaults();
    retrievedFaults.then((response) => {
      setFaults([...response])
      console.log(faults)
    }).finally(() => setIsLoading(false))

  }

  const typeOfProblemOptions = ['plumbing', 'electrical', 'carpentry'];

  const openPicker = async (selectType:string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"]
    });

    if (!result.canceled) {
        console.log('image upload', result);
        setForm({
          ...form,
          image: result.assets[0]
      });
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submitForm = async () => {
    setSignUpLoading(true)
    setIsLoading(true);
    if (form.plotNumber === "" || form.description === "" || form.type === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    try {
      const result = await submitFault(form);
      //dispatch(setStoreFaults(result));
      toast.show('Fault submitted successfully.. Expect to be assisted within the next 14 days.',{
        type: "success",
      });

      clearForm();
      //dispatch(setIsLoading(false));
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {
      fetchData();
    }
  }

  const clearForm = () => {
    setForm({
      plotNumber: "",
      type:"",
      description:"",
      image:null
    })
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader />

        {(!isLoading && faults.length > 0) && <FlatList
        style={styles.flatList}
        data={faults}
        renderItem={({item}) => <View><FaultItem referenceNo={item.referenceNo} faultType={item.type} status={item.status} dateCreated={item.dateCreated} /></View>}
        keyExtractor={item => item.$id}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.container}>
                <Text style={styles.pageTitle}>
                  Your Reported Faults
                </Text>
                <Text style={styles.pageDescription}>
                  This is a list of your previous faults.
                </Text>

                <View style={styles.detailsHeader}>
                  <Text style={styles.headerText}>Ref No.</Text>
                  <Text style={styles.headerText}>Fault type</Text>
                  <Text style={styles.headerText}>Status</Text>
                </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Reported Faults" subtitle="You have not submitted any faults" />
        )}
      /> }

        {!isLoading && <View style={styles.container}>
          <Text style={styles.pageTitle}>New Fault</Text>
          <Text style={styles.pageDescription}>Fill in the form below to send a report to our maintenance department about any problems in your BHC house </Text>

          <FormField label="Plot Number" value={form.plotNumber} handleChangeText={(e:any) => setForm({ ...form, plotNumber: e })} placeholder="eg. Plot 234, Tlokweng"/>
          <DropDown dropDownTitle="Type of problem?" listData={typeOfProblemOptions} handleSelection={(e:any) => setForm({ ...form, type: e })} />
          <FormField  label="Description" value={form.description} handleChangeText={(e:any) => setForm({ ...form, description: e })} placeholder="eg. Water Leak"/>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.image ? (
              <View>
              <View><Text style={styles.uploaderTitle}>Upload an Image</Text></View>
              <View style={styles.imageUploader}>
                <FontAwesome name="file" size={24} color="#000" />
                <Text style={styles.chooseText}>
                  Image Uploaded
                </Text>
              </View>
            </View>
              
            ) : (
              <View>
                <View><Text style={styles.uploaderTitle}>Upload an Image</Text></View>
                <View style={styles.imageUploader}>
                  <FontAwesome name="upload" size={24} color="#000" />
                  <Text style={styles.chooseText}>
                    Choose a file
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>


          <CustomButton title="Submit" handlePress={submitForm} isLoading={signUpLoading} type="primarySingle" />
          <View style={styles.bottom}></View>
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
    textAlign:'center',
    marginTop:20
  },
  subTitle:{
    fontFamily:'Poppins-SemiBold',
    fontSize:20,
    textAlign:'left',
    marginTop:15,
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
  container:{
    flex:1,
    paddingLeft:20,
    paddingRight:20
  },
  flatList:{
    flexGrow:0
  },
  linkWrapper:{
    textAlign:'center',
    marginTop:10
  },
  link:{
    marginLeft:2,
    color:'#ad2524'
  },
  imageUploader:{
    flexDirection:'row'
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
  },
  uploaderTitle:{
    fontSize: 16
  },
  chooseText:{
    marginTop:6,
    marginLeft:6,
    fontSize:14
  },
  bottom:{
    height: 35
  },
  detailsHeader:{
    flexDirection:"row",
    paddingBottom:10,
    paddingTop:10,
    backgroundColor: 'black',
    color:'white',
    fontFamily:'Poppins-SemiBold',
    fontSize:18,
    borderRadius:1
  },
  headerText:{
    color:'white',
    padding:6
  },

});

export default faults;