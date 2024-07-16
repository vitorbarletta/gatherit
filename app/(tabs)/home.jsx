import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useUser } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import PopularEvents from '../../components/PopularEvents';


export default function Home() {
    
    const { user } = useUser()
  
    return (
    <ScrollView style={{
        backgroundColor: Colors.white,
        height: '100%'
    }}>

    {/* HEADER */}
    <Header/>

    {/* SLIDER */}
    <Slider/>

    {/* EVENTOS EM ALTA */}
    <PopularEvents/>
    
      
    
    </ScrollView>
  )
}