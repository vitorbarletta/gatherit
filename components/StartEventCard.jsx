import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from './Button'
import { useRouter } from 'expo-router'

export default function StartEventCard() {
  
    const router = useRouter()

    return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '20%'
    }}>
      
      <Image source={require('../assets/images/calendar.jpg')}></Image>
      <Text 
      style={{
        fontSize: 24,
        fontFamily: 'airbnbcereal-bold',
        marginTop: 25
      }}
      
      >Nenhum evento marcado</Text>

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
      >Não deixe seu calendário vazio! Marque agora e transforme dias comuns em momentos especiais.</Text>

    <TouchableOpacity 
    onPress={()=> router.push('/create-event/addEvent')}
    style={{
        marginTop: 30
    }}>
      <Button text={'NOVO EVENTO'}/>
    </TouchableOpacity>
    </View>
  )
}