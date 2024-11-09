import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from './Button'
import { useRouter } from 'expo-router'

export default function StartParticipantsCard() {
  
    const router = useRouter()

    return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '20%'
    }}>
      
      <Image style={{width: 200, height: 200}} source={require('../assets/images/no-group.png')}></Image>
      <Text 
      style={{
        fontSize: 24,
        fontFamily: 'airbnbcereal-bold',
        marginTop: 25,
        textAlign: 'center'
      }}
      
      >Nenhum participante encontrado</Text>

      <Text
        style={{
        fontSize: 16,
        fontFamily: 'airbnbcereal-bold',
        marginTop: 15,
        color: '#747688',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20
        }}
      >Este evento ainda está esperando por seus primeiros participantes.</Text>

    </View>
  )
}