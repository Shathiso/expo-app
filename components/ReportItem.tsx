import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import React from 'react'

import { FontAwesome } from '@expo/vector-icons';

interface props{
    referenceNo:string
    dateCreated:string,
    status:string,
}
const ReportItem = ({referenceNo, dateCreated, status}:props) => {
  return (
    <View >
        <View style={styles.detailsContainer}><Text>{referenceNo}</Text><Text>{status}</Text><Text>{dateCreated}</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsContainer:{
    flex: 1,
    padding: 32,
    gap: 16,
    marginBottom: 15,
    flexDirection:'row'
  }
});

export default ReportItem;