import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig';
import PopularEventCard from './PopularEventCard';

export default function PopularEvents() {
    
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        GetEventList()
    }, [])

    const GetEventList = async () => {
        setEventList([])
        const q = query(collection(db, 'EventList'), limit(10))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setEventList(prev => [...prev, {id:doc?.id, ...doc.data()}])
        })

    }

    return (
    <View style={{
        marginTop: 15,
        padding: 15
    }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'airbnbcereal-bold'
      }}>Eventos em Alta</Text>

      <FlatList
      data={eventList}
      horizontal={true}                
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <PopularEventCard
        key={index}
        event={item}
        />
      )}
      />
    </View>
  )
}