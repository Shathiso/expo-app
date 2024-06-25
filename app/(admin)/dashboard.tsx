import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native'
import FormField from "@/components/FormField";
import React from 'react'
import CustomButton from "@/components/CustomButton";
import LogoHeader from "@/components/LogoHeader";
import { FontAwesome } from '@expo/vector-icons';
import EmptyState from "../../components/EmptyState";

import { useToast } from "react-native-toast-notifications"; 
import FaultItem from "../../components/FaultItem"; 
import { formatDate } from "../../utilities/utilityFunctions";

import { getUsersCount, getApplications, getListings, getAllFaults } from '../../server/appWriteConfig.js'

import { useGlobalContext } from "../../store/globalProvider";

const dashboard = () => {

  const {isLoading, setIsLoading} = useGlobalContext();
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [listings, setListings] = useState([]);
  const [faults, setFaults] = useState([]);
  const toast = useToast();

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);


  const fetchData = async () => {
    
    const retrievedUsers =  await getUsersCount();
    const retrievedApplications = await getApplications();
    const retrievedListings = await getListings();
    const retrievedFaults = await getAllFaults();
    
    if(retrievedUsers) setUsers([...retrievedUsers]);
    if(retrievedApplications) setApplications([...retrievedApplications.documents]);
    if(retrievedListings) setListings([...retrievedListings.documents]);
    if(retrievedFaults) setFaults([...retrievedFaults]);

    if(retrievedApplications && retrievedUsers && retrievedListings && retrievedFaults){
      setIsLoading(false)
    }

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
                <Text style={styles.statsDetails}>{applications.length}</Text>
              </View>
              <View style={styles.statsBox}>
                <Text style={styles.statsTitle}>Listings</Text>
                <Text style={styles.statsDetails}>{listings.length}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.sectionDescription}>Faults Section</Text>
              <View style={styles.detailsWrapper}>
                <FlatList
                  style={styles.flatList}
                  data={faults}
                  renderItem={({item}) => <View><FaultItem referenceNo={item.referenceNo} faultType={item.type} status={item.status} dateCreated={formatDate(item.dateCreated)} /></View>}
                  keyExtractor={item => item.$id}
                  ListHeaderComponent={() => (
                    <View>
                      <View style={styles.containerNoPadding}>
                          <Text style={styles.tableDescription}>
                            This is a list of submitted faults.
                          </Text>

                          <View style={styles.detailsHeader}>
                            <Text style={styles.headerRefText}>Ref</Text>
                            <Text style={styles.headerText}>Type</Text>
                            <Text style={styles.headerText}>Status</Text>
                            <Text style={styles.headerText}>Date</Text>
                          </View>
                      </View>
                    </View>
                  )}
                  ListEmptyComponent={() => (
                    <EmptyState title="No Reported Faults" subtitle="No submitted faults by tenants." />
                  )}
                /> 
              </View>
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
  tableDescription:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'center',
    marginTop:10,
    marginBottom: 20
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

  containerNoPadding:{
    flex:1,
    paddingLeft:2,
    paddingRight:2
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
    minWidth:103,
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
    minWidth:95,
    maxWidth:95,
    overflow:"hidden",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  headerRefText:{
    color:'white',
    marginLeft:5,
    minWidth:30,
    maxWidth:40,
    overflow:"hidden",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center"
  }


});

export default dashboard;