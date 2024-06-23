import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";
import { FontAwesome } from '@expo/vector-icons';

import { useToast } from "react-native-toast-notifications";  

import EmptyState from "@/components/EmptyState";
import { getUsersCount } from '../../server/appWriteConfig.js'

import { useGlobalContext } from "../../store/globalProvider";

const dashboard = () => {

  const {isLoading, setIsLoading} = useGlobalContext();
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState(0);
  const [listings, setListings] = useState(0);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async() => {
    setIsLoading(true);
    const retrievedUsers =  await getUsersCount();
    
    if(retrievedUsers) setUsers([...retrievedUsers]);
    setIsLoading(false)

  }


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader />

        {(!isLoading) && 
        <View style={styles.container}>
            <View>
              <Text style={styles.pageTitle}>Dashboard</Text>
              <Text style={styles.pageDescription}>Platform statistics</Text>
            </View>
            <View style={styles.statSectionWrapper}>
              <View style={styles.statsBox}>
                <Text style={styles.statsTitle}>Users</Text>
                <Text style={styles.statsDetails}>{users.length}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.statsTitle}>Applications</Text>
                <Text style={styles.statsDetails}>{applications}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.statsTitle}>Listings</Text>
                <Text style={styles.statsDetails}>{listings}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.sectionDescription}>Faults Section</Text>
              <View style={styles.detailsWrapper}></View>
            </View>
            
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
  pageDescription:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'center',
    marginTop:10,
  },
  sectionDescription:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'left',
    marginTop:30,
  },
  container:{
    flex:1,
    paddingLeft:20,
    paddingRight:20
  },
  statSectionWrapper:{
    display:"flex",
    justifyContent:"space-between",
    width:"100%",
    flexDirection:"row"
  },
  statsBox:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    minWidth:109,
    borderRadius:11,
    backgroundColor:"white",
    opacity:0.9,
    minHeight: 100,
    marginTop:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 1

  },
  detailsWrapper:{
    borderRadius:14,
    backgroundColor:"white",
    opacity:0.9,
    width:"100%",
    minHeight: 230,
    marginTop:20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 1,
    display:"flex",
    justifyContent:"space-between"
  },
  statsTitle:{
    fontFamily:'Poppins-SemiBold',
    fontSize:12,
    textAlign:'center',
  },
  statsDetails:{
    fontFamily:'Poppins-SemiBold',
    fontSize:15,
    textAlign:'center',
  }


});

export default dashboard;