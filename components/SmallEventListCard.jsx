import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router';

export default function SmallEventListCard({event}) {
  
    const router = useRouter()

    return (

    <TouchableOpacity
    onPress={() => router.push('/eventdetail/'+event.id)}
    >
        <View style={{
            backgroundColor: Colors.white,
            borderRadius: 18,
            marginBottom: 10,
            padding: 10,
            shadowColor: '#AAA', // sombra em cinza claro para suavidade
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 5,
            
        }}>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20
            }}>

                <View style={{flex: 0.3}}>
                    <Image
                        source={{uri: event?.imageURL}}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 18,
                        }}
                    />
                </View>
                
                <View style={{flex: 0.7, justifyContent: 'center', gap: 6}}>
                    <Text
                    style={{
                        fontFamily: 'airbnbcereal-bold',
                        fontSize: 13,
                        color: Colors.darkBlue,
                    }}>{event?.date}</Text>

                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            fontFamily: 'airbnbcereal-bold',
                            fontSize: 19,
                        }}
                    >{event?.name}</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        opacity: 0.5,
                        gap: 7,
                    }}>
                        <FontAwesome6 name="location-dot" size={16} color="" />
                        <Text style={{
                            fontFamily: 'airbnbcereal-medium',
                            fontSize: 13,
                        }}>{event?.adress}</Text>
                    </View>
                </View>

                
               
            </View>
            
        </View>
    </TouchableOpacity>
  )
}