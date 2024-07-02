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
        <View style={styles.detailsContainer}>
          <Text style={styles.tableTextRef}>{referenceNo}</Text>
          <Text style={styles.tableText}>{propertyType}</Text>
          <Text style={styles.tableText}>{status}</Text>
          <Text style={styles.tableText}>{dateCreated}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  table:{
    paddingLeft:20,
    paddingRight:20
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
    minWidth:85,
    maxWidth:85,
    overflow:"hidden",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  tableTextRef:{
    marginLeft:5,
    minWidth:40,
    maxWidth:40,
    overflow:"hidden",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  tableDate:{
    minWidth:60,
    maxWidth:40,
    overflow:"hidden",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  detailsContainer:{
    flex: 1,
    padding: 8,
    flexDirection:'row',
    backgroundColor:'white',
    borderRadius:1
  }
});

export default ApplicationItem;