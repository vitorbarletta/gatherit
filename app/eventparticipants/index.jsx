import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert, ToastAndroid, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Colors } from '../../constants/Colors'
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import EventParticipantsCardFull from '../../components/EventParticipants/EventParticipantsCardFull';
import StartParticipantsCard from '../../components/StartParticipantsCard';

export default function EventParticipants() {
    
    const event = useLocalSearchParams()
    const router = useRouter()
    const [participantList, setParticipantList] = useState([]);

    useEffect(() => {
        participantsVerification();
      }, []);

    const participantsVerification = async () => {
        const eventRef = doc(db, 'EventList', event.id);
        const eventDoc = await getDoc(eventRef);
        if (eventDoc.exists()) {
          const eventData = eventDoc.data();
          const participants = eventData.participants || [];
          setParticipantList(participants);
        }
    };

    
  
    return (
    <View style={{padding: 25,
        paddingTop: 65,
        backgroundColor: Colors.white,
        height: '100%'}}>

        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }}>

            <TouchableOpacity onPress={()=> router.back()}>
                <AntDesign name="arrowleft" size={27} color="black" />
            </TouchableOpacity>

            <Text style={{
                fontSize: 24,
                fontFamily: 'airbnbcereal-bold'
            }}>Participantes</Text>
        </View>

        {participantList.length==0 ? <StartParticipantsCard/> : 
            <FlatList
            data={participantList}
            bouncesZoom={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.uid || index.toString()}
            renderItem={({ item }) => (
                <View >
                    <EventParticipantsCardFull participant={item} />
                </View>
            )}
            contentContainerStyle={{ marginTop: 20 }}
            />
        }

        
        
    </View>
  )
}