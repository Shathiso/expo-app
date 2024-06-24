import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, Modal, Pressable, FlatList, TouchableOpacity } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";
import DropDown from "@/components/DropDown";
import { FontAwesome } from '@expo/vector-icons';

import { useGlobalContext } from "../../store/globalProvider";
import ApplicationItem from "../../components/ApplicationItem";
import EmptyState from "@/components/EmptyState";

import { useToast } from "react-native-toast-notifications"; 
import { formatDate } from '@/utilities/utilityFunctions';
import * as DocumentPicker from "expo-document-picker";


import { submitHouseApplication, getUserApplications, storePayment } from '../../server/appWriteConfig.js'


const applications = () => {

  const [form, setForm] = useState({
    postalAddress: "",
    previousOwner:"",
    houseType:"",
    bedrooms:"",
  });

  const [paymentForm, setPaymentForm] = useState({
    accountHolder:"",
    accountNo:"",
    ccv:""
  });

  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [applications, setApplications] = useState([]);
  const {isLoading, setIsLoading } = useGlobalContext();
  const [attachments, setAttachments] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const previousOwnerOptions = ['Yes', 'No'];
  const houseTypeOptions = ['Stand Alone', 'Town House', 'Flat/Apartment'];
  const bedroomOptions = ['1 bedroom', '2 bedroom', '3 bedroom'];

  const [signUpLoading, setSignUpLoading]= useState(false);

  const openPicker = async (selectType:string) => {
    //Simulating attaching files
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"]
    });

    if (result) {
      setAttachments(true);
    };
    
  }

  const fetchData = async() => {
    
    setIsLoading(true);
    const retrievedApplications = getUserApplications();
    
    retrievedApplications.then((response) => {
      setApplications([...response])

    }).finally(() => setIsLoading(false))
  }

  const makePayment = async () => {
    setIsLoading(true);
    if (form.postalAddress === "" || form.houseType === "" || form.previousOwner === "") {
      toast.show('Please fill in all application fields', {type: "error"});
      setIsLoading(false);
    } else{
      setIsLoading(false);
      setModalVisible(true);
    }

  }

  const storeApplication = async () => {

    setIsLoading(true);

    if (paymentForm.accountHolder === "" || paymentForm.accountNo === "") {
      toast.show('Please fill in all payment fields', {type: "error"});
      setIsLoading(false);
    }

    try {
      const result = await submitHouseApplication(form);
      setModalVisible(false);
      toast.show('Application submitted successfully..',{
        type: "success",
      });

      clearForm();
      
      
    } catch (error:any) {
      toast.show(error.message, {type: "error"});
    } finally {
      setIsLoading(false);
      fetchData();
    }
  }


  const clearForm = () => {
      setForm({
        postalAddress: "",
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

        {(applications.length > 0 && !isLoading) && <FlatList
        data={applications}
        style={styles.flatList}
        renderItem={({item}) => <View><ApplicationItem referenceNo={item.referenceNo} propertyType={item.houseType} dateCreated={formatDate(item.dateCreated)} /></View>}
        keyExtractor={item => item.$id}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.container}>
                <Text style={styles.applicationTitle}>
                  Your Applications
                </Text>
                <Text style={styles.applicationDescription}>
                  This is a list of your previous applications.
                </Text>
                <View style={styles.detailsHeader}>
                  <Text style={styles.headerRefText}>Ref No.</Text>
                  <Text style={styles.headerText}>Type</Text>
                  <Text style={styles.headerText}>Status</Text>
                  <Text style={styles.headerText}>Date</Text>
                </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Applications" subtitle="You have not submitted any applications yet" />
        )}
      /> }

         { (!isLoading) &&<View style={styles.formContainer}>
          <Text style={styles.pageTitle}>New Application</Text>
          <Text style={styles.pageDescription}>We hope we can assist you in finding your new home. We ask that you provide the details below. </Text>

          <FormField  label="Postal Address" value={form.postalAddress} handleChangeText={(e:any) => setForm({ ...form, postalAddress: e })} placeholder="eg PO Box 277 Tlokweng"/>
          <DropDown dropDownTitle="Previous Owner?" listData={previousOwnerOptions} handleSelection={(e:any) => setForm({ ...form, previousOwner: e })} />
          <DropDown dropDownTitle="House Type?" listData={houseTypeOptions} handleSelection={(e:any) => setForm({ ...form, houseType: e })} />
          <DropDown dropDownTitle="Number of Bedrooms?" listData={bedroomOptions} handleSelection={(e:any) => setForm({ ...form, bedrooms: e })} />
          <TouchableOpacity onPress={() => openPicker("file")}>
            {attachments ? (
              <View>
              <View><Text style={styles.uploaderTitle}>Upload Attachments</Text></View>
              <View style={styles.imageUploader}>
                <FontAwesome name="file" size={20} color="#000" />
                <Text style={styles.chooseText}>
                  Attachment Uploaded
                </Text>
              </View>
            </View>
              
            ) : (
              <View style={styles.uploadWrapper}>
                <View><Text style={styles.uploaderTitle}>Upload Attachment</Text></View>
                <View style={styles.imageUploader}>
                  <FontAwesome name="upload" size={20} color="#000" style={styles.uploadIcon} />
                  <Text style={styles.chooseText}>
                    Choose a file
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
          <CustomButton title="Apply" handlePress={makePayment} isLoading={signUpLoading} type="primarySingle" />
        </View> }
        

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
              <FormField style={styles.modalInput} label="CVC" value={paymentForm.ccv} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, ccv: e })} placeholder="eg. 72812345"/>
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
  container:{
    flex:1,
    paddingLeft:20,
    paddingRight:20
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
    fontSize:24,
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
    minWidth:100,
    maxWidth:100,
    overflow:"hidden",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  headerRefText:{
    color:'white',
    marginLeft:10,
    minWidth:30,
    maxWidth:40,
    overflow:"hidden",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  uploadWrapper:{
    marginLeft:4
  },
  imageUploader:{
    flexDirection:'row'
  },
  uploaderTitle:{
    fontSize: 14,
    marginTop:10
  },
  chooseText:{
    marginTop:6,
    marginLeft:6,
    fontSize:14
  },

  uploadIcon:{
    marginTop:6
  }

  

});

export default applications;