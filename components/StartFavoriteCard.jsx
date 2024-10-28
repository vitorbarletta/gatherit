import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from './Button'
import { useRouter } from 'expo-router'

export default function StartFavoriteCard() {
  
    const router = useRouter()

    return (
    <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '20%'
    }}>
      
      <Image style={{width: 200, height: 200}} source={require('../assets/images/favorite-image.png')}></Image>
      <Text 
      style={{
        fontSize: 24,
        fontFamily: 'airbnbcereal-bold',
        marginTop: 25
      }}
      
      >Nenhum evento favoritado</Text>

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
      >Descubra novas experiências e marque seus favoritos para não perder a chance de aproveitar momentos incríveis.</Text>

    </View>
  )
}