import { View, ActivityIndicator, Dimensions, Platform, StyleSheet } from "react-native";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

interface loader{
    isLoading:boolean
}
const Loader = ({ isLoading }: loader) => {
  const osName = Platform.OS;
  

  if (!isLoading) return null;

  return (
    <View
        style={styles.loader}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#ad2524"
        size="large"
        style={styles.spinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    loader:{
      height: screenHeight,
      width: "100%",
      position:'absolute',
      display:'flex',
      justifyContent:'center',
      zIndex:10,
      opacity:1,
      backgroundColor:"white"
    },
    spinner:{
      zIndex:11
    }
});

export default Loader;
