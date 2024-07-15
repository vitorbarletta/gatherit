import { Text, View } from "react-native";
import Login from '../components/Login.jsx'
import { Redirect } from "expo-router";
import {auth} from './../configs/FireBaseConfig';

export default function Index() {
  
  const user = auth.currentUser
  
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user?<Redirect href={'home'}/>:<Login/>}
      
    </View>
  );
}