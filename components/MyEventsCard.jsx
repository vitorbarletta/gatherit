import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '../constants/Colors'
import { useRouter } from 'expo-router';

export default function MyEventsCard({event}) {
  
    const router = useRouter()

    return (

    <TouchableOpacity
    onPress={() => router.push('/eventdetail/'+event.id)}
    >
        <View style={{
            marginTop: 20,
            backgroundColor: Colors.white,
            borderRadius: 18,
            margin: 10,
            padding: 10,
            shadowColor: '#000', 
            shadowOffset: { width: 0, height: 2 }, 
            shadowOpacity: 0.25, 
            shadowRadius: 3.84, 
            elevation: 5, 
        }}>

            
            <Image
                source={{uri: event?.imageURL}}
                style={{
                    width: '100%',
                    height: 150,
                    borderRadius: 18,
                }}
            />
            
            <View style={{
                padding: 10, 
                flexDirection: 'column',
                gap: 7
            }}>
                <View>

                    <Text
                    style={{
                        fontFamily: 'airbnbcereal-bold',
                        width: '85%',
                        fontSize: 13,
                        color: Colors.darkBlue,
                        marginBottom: 3
                    }}>{event?.date}</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{
                            fontFamily: 'airbnbcereal-bold',
                            width: '85%',
                            fontSize: 18,
                        }}
                    >{event?.name}</Text>
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
                        fontFamily: 'airbnbcereal-medium',
                        fontSize: 13,
                    }}>{event?.adress}</Text>
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

                    }}>+{event?.participants.length} confirmados</Text>
                </View>

               
            </View>
            
        </View>
    </TouchableOpacity>
  )
}