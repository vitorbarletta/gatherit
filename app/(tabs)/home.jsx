import { View, Text, TextInput, ScrollView, RefreshControl  } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { Colors } from '../../constants/Colors'
import { useUser } from '../UserContext';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import PopularEvents from '../../components/PopularEvents';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';


export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [eventListByFavorites, setEventListByFavorites] = useState([]);
    const [eventListByParticipants, setEventListByParticipants] = useState([]);
    const [sliderList, setSliderList] = useState([]); 
    const [error, setError] = useState(null); 
    const [loadingEvents, setLoadingEvents] = useState(false);


    const refreshData = useCallback(async () => {
      setRefreshing(true);
      await GetEventList();
      setRefreshing(false);
    }, []);

    useEffect(() => {
      GetSliderList();
      GetEventList();
    }, []);

    const GetSliderList = async () => {
        try {
            const q = query(collection(db, 'Slider'));
            const querySnapshot = await getDocs(q);
            const images = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                images.push(data);
            });
            setSliderList(images)
            console.log(sliderList.length)
        } catch (err) {
            console.error("Erro ao buscar a lista de slides:", err);
            setError(err.message);
        }
    };

    const GetEventList = async () => {
      setLoadingEvents(true);
      try {
          const q = query(collection(db, 'EventList'));
          const querySnapshot = await getDocs(q);
          const events = [];

          querySnapshot.forEach((doc) => {
              events.push({ id: doc.id, ...doc.data() });
          });

          // Ordenar por favoritos
          const sortedByFavorites = [...events].sort((a, b) => {
              const favoritesA = a.favorites?.length || 0;
              const favoritesB = b.favorites?.length || 0;
              return favoritesB - favoritesA;
          });

          // Ordenar por participantes
          const sortedByParticipants = [...events].sort((a, b) => {
              const participantsA = a.participants?.length || 0;
              const participantsB = b.participants?.length || 0;
              return participantsB - participantsA;
          });

          setEventListByFavorites(sortedByFavorites);
          setEventListByParticipants(sortedByParticipants);
      } catch (error) {
          console.error("Erro ao buscar os eventos:", error);
      }
      setLoadingEvents(false);
  };


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
    <Slider data={sliderList.slice(0, 4)} error={error} />

    <View style={{
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 0
    }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'airbnbcereal-bold',
      }}>Destaques do Momento</Text>
      <PopularEvents events={eventListByFavorites} loading={loadingEvents} />
    </View>
            
    <Slider data={sliderList.slice(4)} error={error} />
    
    <View style={{
        marginTop: 15,
        paddingLeft: 15,
        paddingRight: 0
    }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'airbnbcereal-bold',
      }}>Mais Procurados</Text>
      <PopularEvents events={eventListByParticipants} loading={loadingEvents} />
    </View>
    
    </ScrollView>
  )
}