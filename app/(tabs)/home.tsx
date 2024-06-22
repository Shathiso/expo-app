import { StatusBar } from "expo-status-bar";
import { Redirect, router} from "expo-router";
import { Image, StyleSheet, Platform, View, Text, FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect  } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '@/components/CustomButton';
import LogoHeader from "@/components/LogoHeader";

import { State } from '../../typescript_types/types'
import { setIsLoading } from "@/store/store-slices/userSlice";
import { useState } from "react";
import { getListings } from "@/server/appWriteConfig";
import ListingItem from "@/components/ListingItem";
import EmptyState from "@/components/EmptyState";


export default function HomeScreen() {

  const dispatch = useDispatch();
  const [listings, setListings] = useState([]);
  const isLoading = useSelector((state:State) => state.userDetails.isLoading)


  useEffect(() => {
    dispatch(setIsLoading(true));
    const retrievedListings = getListings();
    retrievedListings.then((response) => {
      setListings([...response.documents])

      //if(listings.length > 0)
      console.log('listings',listings)

    }).finally(()=> dispatch(setIsLoading(false)))
  }, []);

  const isLoggedIn = useSelector((state:State) => state.userDetails.isLoggedIn)
  const currentUser = useSelector((state:State) => state.userDetails.user)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView>
        <LogoHeader  />
        <View>
         {!isLoading && <FlatList
          data={listings}
          keyExtractor={(item) => item.$id}
          renderItem={({item}) => 
          <ListingItem 
            key={item.listingId}
            description={item.description} 
            price={item.price}
            imageUrl={item.image} 
            bedrooms={item.bedrooms}
            type={item.propertyType}
          />}
          ListHeaderComponent={() => (
            <View>
              <View style={styles.titleContainer}>
                  <Text style={styles.pageTitle}>
                    Welcome Back
                  </Text>
                  <Text style={styles.pageDescription}>
                    Latest Properties
                  </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState title="No Properties Found" subtitle="No properties listed yet" />
          )}
          />}
        </View>
        <StatusBar backgroundColor="#161622" style="dark" />
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
  titleContainer:{
    marginTop:12,
    display:"flex",
    textAlign:"center",
    marginBottom:1
  },
  pageDescription:{
    fontFamily:'Poppins-Regular',
    fontSize:14,
    textAlign:'center',
    marginTop:10,
    marginBottom: 16
  }
 
});

