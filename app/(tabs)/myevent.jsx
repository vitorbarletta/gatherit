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

export default function MyEvent() {
  const {user} = useUser()
  const [userEvent, setUserEvent] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.uid) {
      GetUserEvents();
    }
  }, [user]);

  const GetUserEvents = async () => {
    if (!user?.uid) return; // Adicionar verificação para user.uid
    setLoading(true);
    setUserEvent([]);
    const q = query(collection(db, 'EventList'), where('userId', '==', user.uid));

    try {
      const querySnapshot = await getDocs(q);
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      setUserEvent(events);
    } catch (error) {
      console.error("Erro ao buscar eventos do usuário:", error);
    } finally {
      setLoading(false);
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
        }}>Meus Eventos</Text>

        <TouchableOpacity 
        onPress={()=> router.push('/create-event/addEvent')}
        >
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
            <FontAwesome6 name="add" size={24} color="black" />    
          </View>
        </TouchableOpacity>
      </View>
    
      {userEvent?.length==0?
      <StartEventCard/>:
      <FlatList
      style={{}}
      showsVerticalScrollIndicator={false}
        data={userEvent}
        onRefresh={GetUserEvents}
        refreshing={loading}
        renderItem={({item, index}) => (
          <MyEventsCard event={item} key={index}/>
        )}
      />  
      }

     
    
    
    </View>
  )
}