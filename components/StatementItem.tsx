import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import React from 'react'

import { FontAwesome } from '@expo/vector-icons';

interface props{
    referenceNo:string
    dateCreated:string,
    amount:number,
}
const StatementItem = ({referenceNo, dateCreated, amount}:props) => {
  return (
    <View style={styles.table}>
        <View style={styles.detailsContainer}>
          <Text style={styles.tableTextRef}>{referenceNo}</Text>
          <Text style={styles.tableText}>P{amount}</Text>
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
  detailsContainer:{
    flex: 1,
    padding: 8,
    flexDirection:'row',
    backgroundColor:'white',
    borderRadius:1
  },
  tableText:{
    minWidth:100,
    maxWidth:100,
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

export default StatementItem;