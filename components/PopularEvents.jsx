import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig';
import PopularEventCard from './PopularEventCard';

export default function PopularEvents() {
    
    const [eventList, setEventList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        GetEventList()
    }, [])

    const GetEventList = async () => {
        setLoading(true)
        setEventList([])
        const q = query(collection(db, 'EventList'), limit(10))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setEventList(prev => [...prev, {id:doc?.id,...doc.data()}])
        })
        setLoading(false)
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
      onRefresh={GetEventList}
      refreshing={loading}               
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