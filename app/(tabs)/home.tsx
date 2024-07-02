import { StatusBar } from "expo-status-bar";
import { Redirect, router} from "expo-router";
import { Image, StyleSheet, Platform, View, Text, FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect  } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '@/components/CustomButton';
import LogoHeader from "@/components/LogoHeader";


import { useState } from "react";
import { getListings } from "@/server/appWriteConfig";
import ListingItem from "@/components/ListingItem";
import EmptyState from "@/components/EmptyState";
import { useGlobalContext } from "../../store/globalProvider";


export default function HomeScreen() {

  const [listings, setListings] = useState<any>([]);
  const {isLoading, setIsLoading} = useGlobalContext();


  useEffect(() => {

    setIsLoading(true);
    const retrievedListings = getListings();
    retrievedListings.then((response:any) => {
      setListings([...response.documents])

    }).finally(()=> setIsLoading(false))
  }, []);


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

