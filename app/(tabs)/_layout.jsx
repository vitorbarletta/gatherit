import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import {Colors} from '../../constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import SignIn from '../auth/sign-in/index'
import SignUp from '../auth/sign-up/index'
import { UserProvider } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout() {
  
  return (
  <UserProvider>
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.blue,
      tabBarLabelStyle: {
        fontSize: 12, 
        fontFamily: 'airbnbcereal-bold',
      },
      tabBarStyle:{
        height: 80
      }
    }}>
        <Tabs.Screen 
        name='home'
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color}) => <Ionicons name="home-sharp" size={24} color={color} />
        }}
        />
        
        <Tabs.Screen 
        name='myevent'
        options={{
          tabBarLabel:'Meus Eventos',
          tabBarIcon:({color}) => <MaterialIcons name="event" size={25} color={color} />
        }}
        />

        <Tabs.Screen 
        name='myfavorites'
        options={{
          tabBarLabel:'Favoritos',
          tabBarIcon:({color}) => <MaterialCommunityIcons name="cards-heart-outline" size={28} color={color} />
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