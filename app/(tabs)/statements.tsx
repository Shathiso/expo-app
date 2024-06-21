import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, FlatList, Pressable, Modal } from 'react-native'
import LogoHeader from '@/components/LogoHeader';
import { FontAwesome } from '@expo/vector-icons';
import FormField from '@/components/FormField';
import { getPropertyPayments, storePayment } from '../../server/appWriteConfig'

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

  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [payments, setPayments] = useState([]);
  const [paymentForm, setPaymentForm] = useState({
    accountHolder:"",
    accountNo:"",
    ccv:""
  });

  useEffect(() => {
    const properties = getPropertyPayments();
    properties.then((response) => {
      setPayments([...response.documents])
      console.log(payments)
    })
  }, []);

  const makePayment = async () => {
    if (paymentForm.accountHolder === "" || paymentForm.accountNo === "" || paymentForm.ccv === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    try {
      const result = await storePayment(paymentForm);
      toast.show('Payment submitted successfully.',{
        type: "success",
      });
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {

    }
  }


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader />
        <View>
          <Text style={styles.pageTitle}>Statements</Text>
          <StatementsList data={payments}/>

          <Text>Total: {}</Text>
        </View>

        <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Payment completed, your application was submitted.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.modalClose]}
              onPress={() => setModalVisible(false)}>
              <FontAwesome name="close" size={21} color="#000" />
            </Pressable>
            <Text style={styles.modalTitle}>Application Payment</Text>
            <Text style={styles.modalSubtitle}>Please enter your banking details below to complete your application.</Text>
            
            <View style={styles.modalFormContainer}>
              <FormField style={styles.modalInput} label="Account Holder" value={paymentForm.accountHolder} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, accountHolder: e })} placeholder="eg. Tshepo Modise"/>
              <FormField style={styles.modalInput} label="Account Number" value={paymentForm.accountNo} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, accountNo: e })} placeholder="eg. 12345"/>
              <FormField style={styles.modalInput} label="CCV" value={paymentForm.ccv} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, ccv: e })} placeholder="eg. 72812345"/>
            </View>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => makePayment()}>
              <Text style={styles.textStyle}>Make Payment</Text>
            </Pressable>
          </View>
        </View>
        </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    minWidth: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 14,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop:10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalFormContainer:{
    width:'90%'
  },
  modalTitle: {
    fontSize:17,
    fontFamily:'Poppins-SemiBold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitle:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    marginBottom: 10,
  },
  modalInput:{
    borderWidth: 1
  },
  modalClose:{
    position:'absolute',
    top:5,
    right:5
  }
});
