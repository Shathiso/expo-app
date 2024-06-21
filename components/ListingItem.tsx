  import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native'
  import React from 'react'
  
  import { FontAwesome } from '@expo/vector-icons';
  
  interface props{
    imageUrl:string,
    description:string,
    price:number,
    bedrooms:string,
    type:string
  }
  const ListingItem = ({description, price, imageUrl, bedrooms, type}:props) => {
    return (
        <View style={styles.listingContainer}>
            <Image style={styles.mainImage} 
            source={{uri:imageUrl}}
            resizeMode='cover'/>
            <Text style={styles.price}>P{price}</Text>
            <View>
               <Text style={styles.header}>Description</Text>
               <Text>{description}</Text>
               <View style={styles.detailsContainer}><Text style={styles.header}>Bedrooms:</Text><Text>{bedrooms}</Text></View>
               <View style={styles.detailsContainer}><Text style={styles.header}>Property type:</Text><Text>{type}</Text></View>
               
            </View>
        </View>
    )
  }
  
  const styles = StyleSheet.create({
    listingContainer:{
        flex: 1,
        padding: 32,
        gap: 16,
    },
    mainImage:{
        height: 185,
        width:'100%',
        borderRadius: 10
    },
    header:{
      fontFamily:"Poppins-SemiBold",
      marginRight:4
    },
    price:{
      fontFamily:"Poppins-SemiBold",
      position:'absolute',
      backgroundColor:"#ad2524",
      color:'white',
      padding:6,
      top:45,
      right:33,
      zIndex:2
    },
    detailsContainer:{
        flexDirection:'row'
    },
    description:{
        fontFamily:'Poppins-Medium',
        textAlign:'center',
        marginRight:5,
        marginTop:3.5
    },

  });
  
  export default ListingItem;