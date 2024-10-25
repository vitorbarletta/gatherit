import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import StartEventCard from '../../components/StartEventCard'
import Button from '../../components/Button'
import { router } from 'expo-router'
import { useUser } from '../UserContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'
import MyEventsCard from '../../components/MyEventsCard'
import { FontAwesome6 } from '@expo/vector-icons';

export default function MyFavorites() {
  const {user} = useUser()
  const [userFavorite, setuserFavorite] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.uid) {
      GetUserFavorites();
    }
  }, []);

  const GetUserFavorites = async () => {
    if (!user?.uid) return; // Adicionar verificação para user.uid
    setLoading(true);
    setuserFavorite([]);
    const q = query(collection(db, 'EventList'), where('favorites', 'array-contains', user.uid));

    try {
      const querySnapshot = await getDocs(q);
      const favorites = [];
      querySnapshot.forEach((doc) => {
        favorites.push({ id: doc.id, ...doc.data() });
      });
      setuserFavorite(favorites);
    } catch (error) {
      console.error("Erro ao buscar eventos do usuário:", error);
    } finally {
      setLoading(false);
      console.log(userFavorite.length);
    }
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 65,
      backgroundColor: Colors.white,
      height: '100%'
    }}>
      <View style={{
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Text style={{
          fontSize: 24,
          fontFamily: 'airbnbcereal-bold'
        }}>Favoritos</Text>
      </View>
    
      {userFavorite?.length==0?
      <StartEventCard/>:
      <FlatList
      style={{}}
      showsVerticalScrollIndicator={false}
        data={userFavorite}
        onRefresh={GetUserFavorites}
        refreshing={loading}
        renderItem={({item, index}) => (
          <MyEventsCard event={item} key={index}/>
        )}
      />  
      }
    </View>
  )
}