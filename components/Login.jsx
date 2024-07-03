import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {
    
    const router = useRouter()
    
    return (
    <View style={{
        backgroundColor: Colors.white
    }}>
      <Image source={require('./../assets/images/login.jpg')}
        style={{
            width: '100%',
            height: 600,
            marginTop: '10%'
        }}
      />

      <View style={styles.container}>

        <Text
            style={{
                fontSize: 24,
                fontFamily: 'airbnbcereal-bold',
                color: '#fff', 
                textAlign: 'center',
                marginBottom: 20,
                marginTop: 10
            }}
        >Para procurar mais eventos ou atividades próximas no mapa</Text>

        <Text
            style={{
                fontSize: 15,
                fontFamily: 'airbnbcereal-bold',
                color: '#fff',
                opacity: .80,
                textAlign: 'center'
            }}
        >Aplicativo voltado pra você que busca procurar eventos acontecendo perto da sua localidade.</Text>

        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '20%'
        }}>
            <TouchableOpacity
                onPress={()=> router.push('auth/sign-in')}
            >
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'airbnbcereal-bold',
                    color: '#fff',
                    opacity: .50,
                }}
                >Pular</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=> router.push('auth/sign-in')}
            >
                <Text style={{
                    fontSize: 18,
                    fontFamily: 'airbnbcereal-bold',
                    color: '#fff',
                }}
                >Próximo</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.blue,
        height: '100%',
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
        padding: 40,
    }
})
