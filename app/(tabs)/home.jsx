import { View, Text, TextInput, ScrollView, RefreshControl  } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Colors } from '../../constants/Colors'
import { useUser } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import PopularEvents from '../../components/PopularEvents';


export default function Home() {
    
    const { user } = useUser()

    const [refreshing, setRefreshing] = useState(false);

    const refreshData = useCallback(async () => {
      setRefreshing(true);
      console.log("Atualizando eventos...");

      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
  
    }, []);


    return (
    <ScrollView 

    style={{
        backgroundColor: Colors.white,
        height: '100%'
    }}
    refreshControl={
      <RefreshControl 
      refreshing={refreshing} 
      onRefresh={refreshData}
      // colors={Colors.blue}
      // tintColor={Colors.blue} 
      />
    }>

    {/* HEADER */}
    <Header/>

    {/* SLIDER */}
    <Slider/>

    {/* EVENTOS EM ALTA */}
    <PopularEvents refreshTrigger={refreshing}/>
    <Slider/>
    <PopularEvents refreshTrigger={refreshing}/>
    
    
      
    
    </ScrollView>
  )
}