import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { router } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { Feather } from '@expo/vector-icons';
export default function EventSucess() {
  return (
    <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: Colors.white
    }}>
        <View>

        <Feather style={{textAlign:'center', marginBottom: 20}} name="check-circle" size={50} color="green" />
            <Text style={{
        fontSize: 20,
        fontFamily: 'airbnbcereal-bold',
        marginBottom: 20
      }}>Evento Marcado com sucesso!</Text>
            <TouchableOpacity
            onPress={() => router.push('/(tabs)/myevent')}>
            <Button
            text={"CONTINUAR"}></Button>
            </TouchableOpacity>
        </View>
    </View>
  )
}