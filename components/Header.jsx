import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { useUser } from '../app/UserContext';
import { Ionicons } from '@expo/vector-icons';


export default function Header() {
    const {user} = useUser()
  
    return (
    <View style={{
        width: '100%',
        backgroundColor: Colors.blue,
        padding: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }}>

        <Text style={{
            marginTop: 40,
            fontSize: 24,
            fontFamily: 'airbnbcereal-bold',
            color: Colors.white
        }}>Olá, {user?.displayName}</Text>

        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            backgroundColor: Colors.white,
            padding: 10,
            borderRadius: 10,
            marginTop: 15,
            marginBottom: 10
        }}>
            <Ionicons name="search" size={24} color={Colors.black} />
            <TextInput placeholder='Pesquisar...' style={{
               fontFamily: 'airbnbcereal-medium',
               fontSize: 15
            }}></TextInput>
        </View>
    </View>
  )
}