import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, Modal, Pressable, FlatList } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";
import DropDown from "@/components/DropDown";
import { FontAwesome } from '@expo/vector-icons';

import { useDispatch } from "react-redux";
import { setStoreApplications } from "@/store/store-slices/userSlice";
import ReportItem from "../../components/ReportItem";
import EmptyState from "@/components/EmptyState";

import { useToast } from "react-native-toast-notifications";  


import { submitHouseApplication, getUserApplications, storePayment } from '../../server/appWriteConfig.js'

const applications = () => {

  const [form, setForm] = useState({
    name:"",
    postalAddress: "",
    mobile:"",
    email:"",
    previousOwner:"",
    houseType:"",
    bedrooms:""
  });

  const [paymentForm, setPaymentForm] = useState({
    accountHolder:"",
    accountNo:"",
    ccv:""
  });

  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const retrievedApplications = getUserApplications();
    retrievedApplications.then((response) => {
      setApplications([...response])
      console.log('applications', applications)
    })
  }, []);

  const previousOwnerOptions = ['Yes', 'No'];
  const houseTypeOptions = ['Stand Alone', 'Town House', 'Flat/Apartment'];
  const bedroomOptions = ['1 bedroom', '2 bedroom', '3 bedroom'];

  const [signUpLoading, setSignUpLoading]= useState(false);
  const dispatch = useDispatch();

  const makePayment = async () => {
    if (form.name === "" || form.email === "" || form.previousOwner === "") {
      Alert.alert("Error", "Please fill in all application fields");
    }

    setModalVisible(true);
  }

  const storeApplication = async () => {

    if (paymentForm.accountHolder === "" || paymentForm.accountNo === "") {
      Alert.alert("Error", "Please fill in all payment fields");
    }

    try {
      const result = await submitHouseApplication(form);
      setModalVisible(false);
      toast.show('Application submitted successfully..',{
        type: "success",
      });

      clearForm();
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {
     
    }
  }

  const clearForm = () => {
      setForm({
        name:"",
        postalAddress: "",
        mobile:"",
        email:"",
        previousOwner:"",
        houseType:"",
        bedrooms:""
      });

      setPaymentForm({
        accountHolder:"",
        accountNo:"",
        ccv:""
      })
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader />

        {(applications.length > 0) && <FlatList
        data={applications}
        style={styles.flatList}
        renderItem={({item}) => <View><ReportItem referenceNo={item.referenceNo} propertyType={item.houseType} /></View>}
        keyExtractor={item => item.$id}
        ListHeaderComponent={() => (
          <View>
            <View>
                <Text style={styles.applicationTitle}>
                  Your Applications
                </Text>
                <Text style={styles.applicationDescription}>
                  This is a list of your previous applications.
                </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Applications" subtitle="You have not submitted any applications yet" />
        )}
      /> }

         <View style={styles.formContainer}>
          <Text style={styles.pageTitle}>New Application</Text>
          <Text style={styles.pageDescription}>We hope we can assist you in finding your new home. We ask that you provide your details below. </Text>

          <FormField label="Name" value={form.name} handleChangeText={(e:any) => setForm({ ...form, name: e })} placeholder="eg. Tshepo Modise"/>
          <FormField  label="Postal Address" value={form.postalAddress} handleChangeText={(e:any) => setForm({ ...form, postalAddress: e })} placeholder="eg PO Box 277 Tlokweng"/>
          <FormField  label="Mobile Number" value={form.mobile} handleChangeText={(e:any) => setForm({ ...form, mobile: e })} placeholder="eg. 72812345"/>
          <FormField  label="Email" value={form.email} handleChangeText={(e:any) => setForm({ ...form, email: e })} placeholder="eg. tshepo@gmail.com"/>
          <DropDown dropDownTitle="Previous Owner?" listData={previousOwnerOptions} handleSelection={(e:any) => setForm({ ...form, previousOwner: e })} />
          <DropDown dropDownTitle="House Type?" listData={houseTypeOptions} handleSelection={(e:any) => setForm({ ...form, houseType: e })} />
          <DropDown dropDownTitle="Number of Bedrooms?" listData={bedroomOptions} handleSelection={(e:any) => setForm({ ...form, bedrooms: e })} />
          <CustomButton title="Apply" handlePress={makePayment} isLoading={signUpLoading} type="primarySingle" />
        </View>
        

        <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Payment completed, your application was submitted.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.modalClose]}
              onPress={() => setModalVisible(false)}>
              <FontAwesome name="close" size={21} color="#000" />
            </Pressable>
            <Text style={styles.modalTitle}>Application Payment</Text>
            <Text style={styles.modalSubtitle}>Please enter your banking details below to complete your application.</Text>
            
            <View style={styles.modalFormContainer}>
              <FormField style={styles.modalInput} label="Account Holder" value={paymentForm.accountHolder} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, accountHolder: e })} placeholder="eg. Tshepo Modise"/>
              <FormField style={styles.modalInput} label="Account Number" value={paymentForm.accountNo} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, accountNo: e })} placeholder="eg. 12345"/>
              <FormField style={styles.modalInput} label="CCV" value={paymentForm.ccv} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, ccv: e })} placeholder="eg. 72812345"/>
            </View>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => storeApplication()}>
              <Text style={styles.textStyle}>Make Payment</Text>
            </Pressable>
          </View>
        </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safeAreaView:{
    height: '100%',
  },
  flatList:{
    flexGrow:0
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
  applicationTitle:{
    fontFamily:'Poppins-SemiBold',
    fontSize:18,
    marginTop:24,
    textAlign:'center'
  },
  applicationDescription:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'center',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    minWidth: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 14,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop:10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalFormContainer:{
    width:'90%'
  },
  modalTitle: {
    fontSize:17,
    fontFamily:'Poppins-SemiBold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    marginBottom: 10,
  },
  modalInput:{
    borderWidth: 1
  },
  modalClose:{
    position:'absolute',
    top:5,
    right:5
  }

  

});

export default applications;