import { View, StyleSheet, Image} from 'react-native'
import { Link, router } from "expo-router";

import { useGlobalContext } from '../store/globalProvider';
import { signOut } from '@/server/appWriteConfig';
import CustomButton from './CustomButton';


const LogoHeader = () => {

  const {isLoading, isLoggedIn, setIsLoading, setIsLoggedIn} = useGlobalContext();

  const signout = async () => {
    console.log('signing out')
    setIsLoading(true);
    try {
      const signedOut = await signOut();

      if(signedOut){
        setIsLoggedIn(false);
      }
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsLoading(false);
      router.push('/login')
    }
 
  }

  return (
    <View style={styles.logoContainer}>
      <Link href="/" style={styles.linkContainer}>
        <Image source={require('@/assets/images/logo.png')}
            style={styles.logo}
            resizeMode='contain'
            />
      </Link>
      {(isLoggedIn) && <View style={styles.userSectionContainer}>
        <CustomButton type="signout" handlePress={signout} isLoading={isLoading} title="Sign Out"/>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    linkContainer:{
      flex:1,
      maxWidth:100,
      height:60
    },
    logoContainer:{
      display: 'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'white',
      width: '100%',
      height: 60,
      maxHeight:60,
      flex:1
    },
    userSectionContainer:{
      display: 'flex',
      flexDirection:'row',
      zIndex:5,
      marginTop:0,
      marginRight:10
    },
    logo:{
      width:100,
      height:55
    },
    avatar:{
      width:40,
      height:40,
      borderRadius:40,
      marginTop:12,
      marginRight:5
    }
});

export default LogoHeader