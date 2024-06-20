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
        color="#fff"
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    loader:{
      height: screenHeight,
      width: screenWidth,
      position:'absolute',
      display:'flex',
      justifyContent:'center',
      zIndex:10,
      opacity:0.7,
      backgroundColor:"black"
    },
});

export default Loader;
