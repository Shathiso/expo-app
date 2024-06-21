import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import React from 'react'

import { FontAwesome } from '@expo/vector-icons';

interface props{
    referenceNo:string
    dateCreated:string,
    status:string,
    propertyType:string
}
const ApplicationItem = ({referenceNo, dateCreated, propertyType, status}:props) => {
  return (
    <View style={styles.table}>
        <View style={styles.detailsHeader}><Text style={styles.headerText}>Ref No.</Text>
        <Text style={styles.headerText}>Property type</Text>
        <Text style={styles.headerText}>Status</Text></View>
        <View style={styles.detailsContainer}><Text style={styles.tableText}>{referenceNo}</Text><Text>{propertyType}</Text><Text>Processing</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  table:{
    padding:20,
  

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
  tableText:{
    minWidth:24
  },
  detailsContainer:{
    flex: 1,
    padding: 20,
    gap: 16,
    marginBottom: 15,
    flexDirection:'row',
    backgroundColor:'white',
    borderRadius:1
  }
});

export default ApplicationItem;