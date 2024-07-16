import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import StartEventCard from '../../components/StartEventCard'
import Button from '../../components/Button'
import { router } from 'expo-router'
import { useUser } from '../UserContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'
import PopularEventCard from '../../components/PopularEventCard'

export default function MyEvent() {
  const {user} = useUser()
  const [userEvent, setUserEvent] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    GetUserEvents()
  }, [])

  const GetUserEvents = async () =>{
    setLoading(true)
    setUserEvent([])
    const q = query(collection(db, 'EventList'), where('userId', '==', user?.uid))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      setUserEvent(prev => [...prev, {id:doc.id, ...doc.data()}])
    })
    setLoading(false)
    console.log(userEvent.length)
  }

  return (
    <View style={{
      padding: 25,
      paddingTop: 65,
      backgroundColor: Colors.white,
      height: '100%'
    }}>
      <Text style={{
        fontSize: 24,
        fontFamily: 'airbnbcereal-bold'
      }}>Meus Eventos</Text>
    
      {userEvent?.length==0?
      <StartEventCard/>:
      <FlatList
      style={{height: '100%'}}
        data={userEvent}
        onRefresh={GetUserEvents}
        refreshing={loading}
        renderItem={({item, index}) => (
          <PopularEventCard event={item} key={index}/>
        )}
      />  
      }

      <TouchableOpacity 
    onPress={()=> router.push('/create-event/addEvent')}
    style={{
        marginTop: 200
    }}>
      <Button text={'NOVO EVENTO'}/>
    </TouchableOpacity>
    
    
    </View>
  )
}