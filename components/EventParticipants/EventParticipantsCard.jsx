import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function EventParticipantsCard({participant}) {
  
    const router = useRouter()
    console.log(participant?.userPicture)
    return (

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, width: '100%'}}>
        <View style={{ position: 'relative', width: 52, height: 52, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#5669ff',
            opacity: 0.12,
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.85,
            shadowRadius: 2.84,
            elevation: 5, // Para Android
            }} />
            {participant?.userPicture ? 
            <Image
            source={{uri: participant?.userPicture}}
            style={{height: 52, width: 52, borderRadius: 15}}
            ></Image>: <FontAwesome name="photo" size={24} color={Colors.blue} />}
            
        </View>


        <View style={{ marginLeft: 10, flexDirection: 'row' }}>
            <View>
                <Text style={{ fontSize: 16, color: Colors.black, fontFamily: 'airbnbcereal-bold', marginTop: -5, marginBottom: 5 }}>{participant?.username}</Text>
                <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: 'airbnbcereal-bold'  }}>Participante</Text>
            </View>
        </View>
    </View> 
  )
}