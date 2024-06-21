import { Text, TouchableOpacity, StyleSheet, View, Image, FlatList } from 'react-native'
import React from 'react'
import EmptyState from './EmptyState';

import { FontAwesome } from '@expo/vector-icons';

interface props{
    payments:{
      referenceNo:string,
      dateCreated:string,
    }
}
const ApplicationItem = ({payments}:props) => {
  return (
    <View style={styles.table}>
       <FlatList
        data={payments}
        renderItem={({item}) => <View style={styles.detailsContainer}><Text style={styles.tableText}>{item.referenceNo}</Text><Text>{item.propertyType}</Text><Text>....</Text></View>}
        keyExtractor={item => item.$id}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.detailsHeader}>
            <Text style={styles.headerText}>Ref No.</Text>
            <Text style={styles.headerText}>Property type</Text>
            <Text style={styles.headerText}>Status</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Applications" subtitle="You have not submitted any applications yet" />
        )}
      /> 
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