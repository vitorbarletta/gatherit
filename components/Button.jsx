import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

export default function Button({text}) {
  return (
    <View style={{
        backgroundColor: Colors.blue,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
    }}>
        
      <Text style={{
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'airbnbcereal-bold',
        flexDirection: 'row'
      }}>{text}</Text>

      

    </View>
  )
}