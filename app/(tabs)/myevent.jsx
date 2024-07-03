import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import StartEventCard from '../../components/StartEventCard'

export default function MyEvent() {
  
  const [userEvent, setUserEvent] = useState([])

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
    
      {userEvent?.length==0?<StartEventCard/>:null}
    
    
    </View>
  )
}