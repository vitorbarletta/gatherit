import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert, ToastAndroid, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../Button';
import { arrayUnion, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { useRouter } from 'expo-router';
import { useUser } from '../../app/UserContext';
import EventParticipantsCard from '../EventParticipants/EventParticipantsCard';
import AddEventLoading from '../../app/extra-pages/AddEventLoading'

export default function Intro({ event, eventID, userID }) {
  const router = useRouter();
  const { user } = useUser();
  const [participantState, setParticipantState] = useState(false);
  const [participantList, setParticipantList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    participantsVerification();
  }, []);

  

  const onDelete = () => {
    Alert.alert("Você deseja excluir esse evento?", "Não será possível recuperá-lo depois!", [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => deleteEvent()
      }
    ]);
  };

  const joinEvent = async () => {
    setLoading(true)
    try {
      
      const eventRef = doc(db, 'EventList', eventID);
      const userInfo = {
        uid: user?.uid,
        username: user?.username,
        userPicture: user?.profilePicture
      };
      await updateDoc(eventRef, {
        participants: arrayUnion(userInfo)
      });
      setLoading(false)
      router.push('/extra-pages/JoinEventSucess')
    } catch (error) {
      console.log("Erro ao participar o evento: " + error);
      setLoading(false)
    }
  };

  if (loading){
    return <AddEventLoading />
  }

  const participantsVerification = async () => {
    const eventRef = doc(db, 'EventList', eventID);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      const participants = eventData.participants || [];
      setParticipantList(participants);
      const isParticipating = participants.some(participant => participant.uid === user.uid);
      setParticipantState(isParticipating);
    }
  };

  const deleteEvent = async () => {
    if (!eventID) {
      console.error('ID do evento não está definido');
      return;
    }
    try {
      await deleteDoc(doc(db, 'EventList', eventID));
      router.back();
      ToastAndroid.show("Evento excluído", ToastAndroid.LONG);
    } catch (error) {
      console.error('Erro ao excluir evento: ', error);
    }
  };

  const renderHeader = () => (
    <View>
      <Image
        style={{ width: '100%', height: 300 }}
        source={{ uri: event?.imageURL }}
      />
      <View style={{
        display: 'flex',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 13,
        backgroundColor: Colors.white,
        borderRadius: 30,
        position: 'absolute',
        top: 270,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <Image
          style={{ transform: [{ scale: 1.2 }] }}
          source={require('../../assets/images/logo_group.png')}
        />
        <Text style={{ fontFamily: 'airbnbcereal-bold', fontSize: 15, color: Colors.darkBlue }}>
          +{event?.participants.length} confirmados
        </Text>
        <TouchableOpacity style={{ backgroundColor: Colors.blue, padding: 10, borderRadius: 7, marginLeft: 15 }}>
          <Text style={{ color: Colors.white, fontFamily: 'airbnbcereal-bold', fontSize: 12 }}>
            Convidar
          </Text>
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: '5%', alignSelf: 'flex-start', padding: 30, width: '100%' }}>
        <Text style={{ color: Colors.black, fontSize: 35, fontFamily: 'airbnbcereal-bold' }}>
          {event?.name}
        </Text>
        {user?.uid === userID &&
          <TouchableOpacity onPress={() => onDelete()}>
            <FontAwesome name="trash" size={24} color="red" />
          </TouchableOpacity>
        }
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, width: '100%' }}>
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
              shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.85,
              shadowRadius: 2.84,
              elevation: 5,
            }} />
            <Ionicons name="calendar" size={26} color={Colors.blue} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: Colors.black, fontFamily: 'airbnbcereal-bold', marginTop: -5, marginBottom: 5 }}>
              {event?.date.split(',')[1]}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: 'airbnbcereal-bold' }}>
              {event?.date}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, width: '100%' }}>
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
              shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.85,
              shadowRadius: 2.84,
              elevation: 5,
            }} />
            <Ionicons name="location-sharp" size={24} color={Colors.blue} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: Colors.black, fontFamily: 'airbnbcereal-bold', marginTop: -5, marginBottom: 5 }}>
              {event?.adress}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: 'airbnbcereal-bold' }}>
              {event?.adress}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, width: '100%' }}>
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
              shadowColor: '#000',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.85,
              shadowRadius: 2.84,
              elevation: 5,
            }} />
            {event?.userProfilePicture ?
              <Image
                source={{ uri: event?.userProfilePicture }}
                style={{ height: 52, width: 52, borderRadius: 15 }}
              /> : <FontAwesome name="photo" size={24} color={Colors.blue} />}
          </View>
          <View style={{ marginLeft: 10, flexDirection: 'row' }}>
            <View>
              <Text style={{ fontSize: 16, color: Colors.black, fontFamily: 'airbnbcereal-bold', marginTop: -5, marginBottom: 5 }}>
                {event?.username}
              </Text>
              <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: 'airbnbcereal-bold' }}>
                Organizador
              </Text>
            </View>
          </View>
        </View>
        <View style={{ display: 'flex', alignItems: 'flex-start', marginTop: 25 }}>
          <Text style={{ fontFamily: 'airbnbcereal-bold', fontSize: 18, marginBottom: 15, opacity: 0.84 }}>
            Sobre o Evento
          </Text>
          <Text style={{ fontFamily: 'airbnbcereal-bold', fontSize: 16, color: Colors.gray }}>
            {event?.about}
          </Text>
        </View>
        <View>
            <Text style={{ fontFamily: 'airbnbcereal-bold', fontSize: 18, marginTop: 25, opacity: 0.84 }}>Participantes</Text>
        </View>


        
      </View>
    </View>
  );

  const renderFooter = () => (
    <View>
        {!participantState ?
        
        <TouchableOpacity style={{position: 'relative',paddingLeft: 50, paddingRight: 50, bottom: '0%'}}
        onPress={()=> joinEvent()}
        >
            <Button text={"PARTICIPAR"}/>
        </TouchableOpacity>
         
        : 
        
        <TouchableOpacity style={{paddingLeft: 50, paddingRight: 50}}
        onPress={()=> console.log(user?.profilePicture)}
        >
            <Button text={"CANCELAR PRESENÇA"}/>
        </TouchableOpacity>}
    </View>
  )

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      data={participantList}
      bouncesZoom={true}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.uid || index.toString()}
      renderItem={({ item }) => (
        <View style={{padding:30, paddingTop:0, marginTop: -30}}>
            <EventParticipantsCard participant={item} />
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 50 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    alignItems: 'center',
  },
});
