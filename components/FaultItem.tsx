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
          <Text style={styles.tableText}>{referenceNo}</Text>
          <Text>{faultType}</Text>
          <Text>{status}</Text>
          <Text>{dateCreated}</Text>
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
    minWidth:24
  },
  detailsContainer:{
    flex: 1,
    padding: 8,
    flexDirection:'row',
    backgroundColor:'white',
    borderRadius:1
  }
});

export default FaultItem;