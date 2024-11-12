import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {UserProvider} from './UserContext'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'airbnbcereal-light': require('./../assets/fonts/AirbnbCereal_W_Lt.otf'),
    'airbnbcereal-bold': require('./../assets/fonts/AirbnbCereal_W_Bd.otf'),
    'airbnbcereal-book': require('./../assets/fonts/AirbnbCereal_W_Bk.otf'),
    'airbnbcereal-black': require('./../assets/fonts/AirbnbCereal_W_Blk.otf'),
    'airbnbcereal-medium': require('./../assets/fonts/AirbnbCereal_W_Md.otf'),
    'airbnbcereal-extra-bold': require('./../assets/fonts/AirbnbCereal_W_XBd.otf')
  });

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (

    <UserProvider>
      <Stack screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name="index" /> */}
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </UserProvider>
  );
}
