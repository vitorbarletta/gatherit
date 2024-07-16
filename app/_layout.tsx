import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {UserProvider} from './UserContext'


export default function RootLayout() {
  
  useFonts({
    'airbnbcereal-light': require('./../assets/fonts/AirbnbCereal_W_Lt.otf'),
    'airbnbcereal-bold': require('./../assets/fonts/AirbnbCereal_W_Bd.otf'),
    'airbnbcereal-book': require('./../assets/fonts/AirbnbCereal_W_Bk.otf'),
    'airbnbcereal-black': require('./../assets/fonts/AirbnbCereal_W_Blk.otf'),
    'airbnbcereal-medium': require('./../assets/fonts/AirbnbCereal_W_Md.otf'),
    'airbnbcereal-extra-bold': require('./../assets/fonts/AirbnbCereal_W_XBd.otf')
  })
  
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
