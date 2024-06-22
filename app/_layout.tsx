import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native'

import { useColorScheme } from '@/hooks/useColorScheme';
import GlobalProvider from "../store/globalProvider";
import { ToastProvider } from 'react-native-toast-notifications'


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <ToastProvider
      placement="top"
      duration={5000}
      animationType='slide-in'
      animationDuration={250}
      textStyle={{ fontSize: 14 }}
      offset={50}
      successColor="#28a745"
      normalColor="#007bff"
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
      renderType={{
        custom_type: (toast) => (
          <View style={styles.container}>
            <Text>{toast.message}</Text>
          </View>
        )
      }}
      >
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
        </ThemeProvider>
      </ToastProvider>
    </GlobalProvider>
  );
}


const styles = StyleSheet.create({
  title:{

  },
  message:{

  },
  container:{
      borderRadius:12,
      backgroundColor:'white',
      borderLeftColor: ''
  }
})