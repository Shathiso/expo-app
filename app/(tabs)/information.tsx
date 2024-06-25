import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, SafeAreaView, View, Text, ScrollView} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import LogoHeader from '@/components/LogoHeader';
import ParallaxScrollView from '../../components/ParallaxScrollView'

export default function Information() {

  return (
    <>
      <LogoHeader />
      
      <ParallaxScrollView
      style={styles.parallaxScrollView}
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image
        style={styles.mainImage}
        source={require('@/assets/images/slideshow/slide-2-resized.png')}
        resizeMode='cover'
      />}>
        <View >
          <Text style={styles.pageTitle}>Information</Text>
          <Text style={styles.subTitle}>BHC Knowledge base</Text>
          <View style={styles.contentContainer}>
            <Collapsible title="What is a sale agreement">
              <Text>
                  It is a contract between the purchaser and a seller which sets out the terms and conditions of a sale.
              </Text>
              <ExternalLink href="https://bhc.bw/faqs?page=1">
                <Text>Learn more</Text>
              </ExternalLink>
            </Collapsible>
            <Collapsible title="When will BHC start selling flats and townhouses?">
              <Text>
                BHC has started selling flats and town houses through Sectional Titles. The implementation started with the 64 flats at Block 9, Gaborone. However, the selling of same countrywide shall be done on a "roll out" basis.
              </Text>
            </Collapsible>
            <Collapsible title="What is your Customer Call Centre Phone Number? Is there a toll free number? ">
              <Text>
                  Call (+267)31559902 or 1167, there is no toll free number. 
              </Text>
            </Collapsible>
          </View>
        </View>
      </ParallaxScrollView>
      </>
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
    marginTop:20
  },
  subTitle:{
    fontFamily:'Poppins-Regular',
    fontSize:16,
    textAlign:'center',
    marginTop:10
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
  container:{
    flex:1
  },
  logoContainer:{
    backgroundColor:'white',
    width: 400,
    maxHeight:60,
    height: 60,
    flex:1
  },
  logo:{
    width:100,
    height:60
  },
  mainImageContainer:{
    flex:1,
    maxHeight:185,
  },
  parallaxScrollView:{
    position:"relative"
  },
  mainImage:{
    position:'relative',
    height: 185,
    width:"100%"
  },
  contentContainer:{
    flex: 1,
    padding: 18,
    gap: 16,
    overflow:"scroll",
    minHeight: "87%"
  },
  title:{
    fontSize:18
  },
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
