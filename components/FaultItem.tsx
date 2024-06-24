import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import React from 'react'

import { FontAwesome } from '@expo/vector-icons';

interface props{
    referenceNo:string
    dateCreated:string,
    status:string,
    faultType:string
}
const FaultItem = ({referenceNo, dateCreated, faultType, status}:props) => {
  return (
    <View style={styles.table}>
        <View style={styles.detailsContainer}>
          <Text style={styles.tableTextRef}>{referenceNo}</Text>
          <Text style={styles.tableText}>{faultType}</Text>
          <Text style={styles.tableText}>{status}</Text>
          <Text style={styles.tableText}>{dateCreated}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  table:{
    paddingLeft:0,
    paddingRight:0
  },
  detailsContainer:{
    flex: 1,
    padding: 8,
    flexDirection:'row',
    backgroundColor:'white',
    borderRadius:1
  },
  tableText:{
    minWidth:90,
    maxWidth:90,
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
});

export default FaultItem;