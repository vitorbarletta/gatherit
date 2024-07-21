import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig';
import PopularEventCard from './PopularEventCard';

export default function PopularEvents({ refreshTrigger }) {
    
    const [eventList, setEventList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      GetEventList();
    }, [refreshTrigger]);

    const GetEventList = async () => {
        setLoading(true)
        setEventList([])
        const q = query(collection(db, 'EventList'), limit(10))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
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
      <View style={styles.container}>  
        <FlatList
        data={eventList}
        bounces={false}
        bouncesZoom={false}
        horizontal={true}
        onRefresh={GetEventList}
        refreshing={loading}
        contentContainerStyle={styles.flatListContainer}      
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <PopularEventCard
          key={index}
          event={item}
          />
        )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Center the FlatList vertically
    alignItems: 'center',  // Center the FlatList horizontally
  },
  flatListContainer: {
    alignItems: 'center',  // Center the items vertically within the FlatList
  },
 
});