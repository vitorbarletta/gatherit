import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'
import { Colors } from '../../constants/Colors'
import Intro from '../../components/EventDetail/Intro'

export default function EventDetail() {
  
    const {eventid} = useLocalSearchParams()
    const [event, setEvent] = useState()
    const [loading, setLoading] = useState(false)
    const [userID, setUserID] = useState()
    
    useEffect(()=>{
        GetEventDetailByID()
    }, [])

    const GetEventDetailByID = async () =>{
        setLoading(true)
        const docRef = doc(db, 'EventList', eventid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()){
            setEvent(docSnap.data())
            console.log("ID DO EVENTO:", eventid)
            setUserID(docSnap.data().userId)
            setLoading(false)
        } else {
            console.log("No such document")
            setLoading(false)
        }
    }
    
    return (
    <View>
        {loading? <ActivityIndicator style={{marginTop: '70%'}} size={'large'} color={Colors.blue}/>: 
        <View>
            <Intro event={event} eventID={eventid} userID={userID} />
        </View>}
      
    </View>
  )
}