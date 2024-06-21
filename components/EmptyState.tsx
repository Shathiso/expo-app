import { View, Text, Image, StyleSheet } from "react-native";

interface Props{
    title:string,
    subtitle:string
}

const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:4
    },
    title:{
        fontSize:18,
        fontFamily:'Poppins-SemiBold',
    },
    subtitle:{
        fontSize:15,
        fontFamily:"Poppins-Regular"
    }

});

export default EmptyState;
