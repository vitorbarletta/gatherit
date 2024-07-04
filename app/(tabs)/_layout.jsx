import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import {Colors} from '../../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import SignIn from '../auth/sign-in/index'
import SignUp from '../auth/sign-up/index'
import { UserProvider } from '../UserContext';

export default function TabLayout() {
  
  return (
  <UserProvider>
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.blue,
      tabBarLabelStyle: {
        fontSize: 12, 
        fontFamily: 'airbnbcereal-bold',
        marginTop: -15,
        marginBottom: 15
      },
      tabBarStyle:{
        height: 80
      }
    }}>
        <Tabs.Screen 
        name='myevent'
        options={{
          tabBarLabel:'Meus Eventos',
          tabBarIcon:({color}) => <MaterialIcons name="event" size={25} color={color} />
        }}
        />

        <Tabs.Screen 
        name='discover'
        options={{
          tabBarLabel:'Explorar',
          tabBarIcon:({color}) => <MaterialIcons name="explore" size={27} color={color} />
        }}
        />

        <Tabs.Screen 
        name='profile'
        options={{
          tabBarLabel:'Perfil',
          tabBarIcon:({color}) => <FontAwesome5 name="user-alt" size={25} color={color} />
        }}/>
    </Tabs>
  </UserProvider>
  )
}