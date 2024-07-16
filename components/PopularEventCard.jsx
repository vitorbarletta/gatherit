import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router';

export default function PopularEventCard({event}) {
  
    const router = useRouter()

    return (

    <TouchableOpacity
    onPress={() => router.push('/eventdetail/'+event.id)}
    >
        <View style={{
            marginTop: 20,
            backgroundColor: Colors.white,
            borderRadius: 18,
            padding: 10,
        }}>
            <Image
                source={{uri: event?.imageURL}}
                style={{
                    width: 230,
                    height: 140,
                    borderRadius: 18
                }}
            />
            <View style={{
                padding: 10, 
                flexDirection: 'column',
                gap: 8
            }}>
                <View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            fontFamily: 'airbnbcereal-bold',
                            width: 230,
                            fontSize: 18,
                        }}
                    >{event?.name}</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                }}>
                    <Image
                            source={require('../assets/images/logo_group.png')}
                        />

                    <Text style={{
                        fontFamily: 'airbnbcereal-bold',
                        fontSize: 12,
                        color: Colors.darkBlue,

                    }}>+20 confirmados</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    opacity: 0.5,
                    gap: 10,
                    marginLeft: 3
                }}>
                    <FontAwesome6 name="location-dot" size={16} color="" />
                    <Text style={{
                        fontFamily: 'airbnbcereal-bold',
                        fontSize: 13,
                    }}>{event?.adress}</Text>
                </View>
            </View>
            
        </View>
    </TouchableOpacity>
  )
}