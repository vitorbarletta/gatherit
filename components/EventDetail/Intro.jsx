import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient'
import Button from '../Button'

export default function Intro({event}) {
  
    return (
    <ScrollView
    style={{
        backgroundColor: Colors.white,
        display: 'flex',
        height: '100%'
    }}>
        <StatusBar
            barStyle={"light-content"}
        />

        <Image
            style={{
                width: '100%',
                height: 270
            }}
            source={{uri: event?.imageURL}}
        />

        <View style={{
            display: 'flex',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 13,
            backgroundColor: Colors.white,
            borderRadius: 30,
            position: 'absolute',
            top: '25%',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // Para Android
        }}>
                <Image
                    style={{
                        transform: [{scale: 1.2}]
                    }}
                        source={require('../../assets/images/logo_group.png')}
                />

                <Text style={{
                    fontFamily: 'airbnbcereal-bold',
                    fontSize: 15,
                    color: Colors.darkBlue,

                }}>+20 confirmados</Text>

                <TouchableOpacity style={{
                    backgroundColor: Colors.blue,
                    padding: 10,
                    borderRadius: 7,
                    marginLeft: 15
                }}>
                    <Text style={{
                        color: Colors.white,
                        fontFamily: 'airbnbcereal-bold',
                        fontSize: 12,
                    }}>Convidar</Text>

                </TouchableOpacity>
        </View>
        
        <View style={{
            marginTop: 27,
            alignSelf: 'flex-start',
            padding: 30
        }}>
            <Text style={{
                color: Colors.black,
                fontSize: 35,
                fontFamily: 'airbnbcereal-bold',
            }}>{event?.name}</Text>

        {/* DATA */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
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
                }} />
                <Ionicons name="calendar" size={26} color={Colors.blue} />
            </View>


            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, color: Colors.black, fontFamily: 'airbnbcereal-bold', marginTop: -5, marginBottom: 5 }}>{event?.date}</Text>
                <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: 'airbnbcereal-bold'  }}>{event?.date}</Text>
            </View>
        </View>

        {/* LOCALIZAÇÃO */}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
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
                }} />
                <Ionicons name="location-sharp" size={24} color={Colors.blue} />
            </View>


            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, color: Colors.black, fontFamily: 'airbnbcereal-bold', marginTop: -5, marginBottom: 5 }}>{event?.adress}</Text>
                <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: 'airbnbcereal-bold'  }}>{event?.adress}</Text>
            </View>
        </View> 

        {/* ORGANIZADOR */}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
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
                }} />
                <FontAwesome name="photo" size={24} color={Colors.blue} />
            </View>


            <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                <View>
                    <Text style={{ fontSize: 16, color: Colors.black, fontFamily: 'airbnbcereal-bold', marginTop: -5, marginBottom: 5 }}>Vitor Francisco</Text>
                    <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: 'airbnbcereal-bold'  }}>Organizador</Text>
                </View>
            </View>
        </View> 
            
        <View style={{display: 'flex', alignItems: 'flex-start', marginTop: 25}}>
            <Text style={{
                fontFamily: 'airbnbcereal-bold',
                fontSize: 18,
                marginBottom: 15,
                opacity: 0.84
            }}>Sobre o Evento</Text>

            <Text style={{
                fontFamily: 'airbnbcereal-bold',
                fontSize: 16,
            }}>{event?.about}</Text>
        </View>

        

        </View>

        <TouchableOpacity style={{paddingLeft: 50, paddingRight: 50}}>
            <Button text={"PARTICIPAR"}/>
        </TouchableOpacity>

    </ScrollView>
  )
}