import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig';
import PopularEventCard from './PopularEventCard';

export default function PopularEvents({events, loading }) {
    return (
    <View>
      <View style={styles.container}>  
        <FlatList
        data={events}
        bounces={false}
        bouncesZoom={false}
        horizontal={true}
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