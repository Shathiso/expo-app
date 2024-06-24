import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, StyleSheet, Alert, FlatList, Pressable, Modal } from 'react-native'
import LogoHeader from '@/components/LogoHeader';
import { FontAwesome } from '@expo/vector-icons';
import FormField from '@/components/FormField';

import StatementItem from '../../components/StatementItem';
import EmptyState from '../../components/EmptyState';

import { useGlobalContext } from '../../store/globalProvider';
import { getUserPropertyPayments, getUserProperties, storePropertyPayment  } from '../../server/appWriteConfig';
import { formatDate } from '@/utilities/utilityFunctions';

export default function Statements() {
  const {setIsLoading, isLoading} = useGlobalContext();

  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentPropertyId, setPaymentPropertyId] = useState('');
  const [payments, setPayments] = useState([]);
  const [properties, setProperties] = useState([]);
  const [paymentForm, setPaymentForm] = useState({
    amount: 0,
    accountHolder:"",
    accountNo:"",
    ccv:""
  });

  useEffect(() => {
    setIsLoading(true);

    const retrievedProperties = getUserProperties();
    retrievedProperties.then((response) => {
      setProperties([...response])
    });

    const propertyPayments = getUserPropertyPayments();
    propertyPayments.then((response) => {
      setPayments([...response])
      setIsLoading(false);
    });
  }, []);

  const makePayment = async () => {
    if (paymentForm.accountHolder === "" || paymentForm.accountNo === "" || paymentForm.ccv === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsLoading(true);

    try {
      await storePropertyPayment(paymentForm, paymentPropertyId);
      
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {
      clearForm();
      setIsLoading(false);
      toast.show('Payment submitted successfully.',{
        type: "success",
      });
    }
  }

  const getTotal = (total) => {
      const paymentsTotal = payments.reduce((accumulator,currentValue) => accumulator + currentValue.amount, 0)
      return (parseInt(total) - paymentsTotal);
  }

  const clearForm = () => {
   setPaymentForm({
      amount: 0,
      accountHolder:"",
      accountNo:"",
      ccv:""
    })
  }


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader />
        <View>
          { ((properties.length > 0) && !isLoading) ?
            properties.map((home) => 
              <View key={home.$id}>
                <FlatList
                  style={styles.flatList}
                  data={payments}
                  renderItem={({item}) => <View><StatementItem referenceNo={item.referenceNo} amount={item.amount} dateCreated={formatDate(item.date)} /></View>}
                  keyExtractor={item => item.$id}
                  ListHeaderComponent={() => (
                    <View>
                      <View style={styles.container}>
                          <Text style={styles.pageTitle}>
                            Statements
                          </Text>
                          <Text style={styles.pageDescription}>
                            Below is a list of your statements.
                          </Text>

                          <View style={styles.detailsHeader}>
                            <Text style={styles.headerRefText}>Ref No.</Text>
                            <Text style={styles.headerText}>Amount</Text>
                            <Text style={styles.headerText}>Date created</Text>
                          </View>
                      </View>
                    </View>
                  )}
                  ListEmptyComponent={() => (
                    <EmptyState title="No Statements" subtitle="You have not made any payments" />
                  )}
                /> 
                <Text style={styles.totalWrapper}>
                  <View style={styles.totalWrapper}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text> {getTotal(home.price)}</Text>
                  </View>

                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {setModalVisible(true); setPaymentPropertyId(home.$id)}}>
                  <Text style={styles.textStyle}>Make Payment</Text>
                </Pressable>
                </Text>
              </View>
            )
            : ''
          }
        </View>

        <Modal 
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Payment completed.');
            setModalVisible(!modalVisible);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.modalClose]}
                onPress={() => setModalVisible(false)}>
                <FontAwesome name="close" size={21} color="#000" />
              </Pressable>
              <Text style={styles.modalTitle}>Property Payment</Text>
              <Text style={styles.modalSubtitle}>Please enter your banking details below to complete your payment.</Text>
              
              <View style={styles.modalFormContainer}>
                <FormField style={styles.modalInput} label="Amount" value={paymentForm.amount} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, amount: e })} placeholder=""/>
                <FormField style={styles.modalInput} label="Account Holder" value={paymentForm.accountHolder} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, accountHolder: e })} placeholder="eg. Tshepo Modise"/>
                <FormField style={styles.modalInput} label="Account Number" value={paymentForm.accountNo} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, accountNo: e })} placeholder="eg. 12345"/>
                <FormField style={styles.modalInput} label="CCV" value={paymentForm.ccv} handleChangeText={(e:any) => setPaymentForm({ ...paymentForm, ccv: e })} placeholder="eg. 72812345"/>
              </View>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => makePayment()}>
                <Text style={styles.textStyle}>Pay</Text>
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
    textAlign:'center',
    marginTop:20,
  },
  pageDescription:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'center',
    marginTop:10,
    marginBottom: 16
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
    padding: 10,
    fontSize:14,
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
  },
  container:{
    flex:1,
    paddingLeft:20,
    paddingRight:20
  },
  flatList:{
    flexGrow:0
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
    minWidth:100,
    maxWidth:100,
    overflow:"hidden",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  headerRefText:{
    color:'white',
    marginLeft:10,
    minWidth:30,
    maxWidth:40,
    overflow:"hidden",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center"
  },
  totalWrapper:{
    display:"flex",
    marginTop:15,
    borderTopColor: "black",
    fontSize:18,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:15,
    paddingRight:20
  },
  totalLabel:{
    fontFamily:'Poppins-SemiBold',
  }
});
