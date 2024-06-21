import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, FlatList } from 'react-native'
import LogoHeader from '@/components/LogoHeader';
import { getPropertyPayments } from '../../server/appWriteConfig'

export default function Statements() {

  /*
      list of payments, ( ToDo List )
      pay option, which should update the total seen on the page and deduct from the total
      Make Payment Button, which triggers a modal to pay, when they pay, the total reduces, and an entry is inserted into the list
      Total : 8000 00

      Payments
      ####
      ####
      ####
                         Total: #####
                         Pay Now : (Button)

      Payments database,
      Type: application admin fee || rental/property,
      download pdf of statement option

  */

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const retrievedFaults = getPropertyPayments();
    retrievedFaults.then((response) => {
      setPayments([payments, ...response.documents])
      console.log(payments)
    })
  }, []);


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader />
        <View>
          <Text style={styles.pageTitle}>Statements</Text>
          <Text></Text>

          <Text>Total: {}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView:{
    height: '100%'
  },
  pageTitle:{
    fontFamily:'Poppins-SemiBold',
    fontSize:24,
    textAlign:'center'
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
