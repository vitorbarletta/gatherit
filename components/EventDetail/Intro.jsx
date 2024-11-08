import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Alert, ToastAndroid, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../Button';
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../configs/FireBaseConfig';
import { useRouter } from 'expo-router';
import { useUser } from '../../app/UserContext';
import EventParticipantsCard from '../EventParticipants/EventParticipantsCard';
import EventPageLoading from '../../app/extra-pages/EventPageLoading';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import Feather from '@expo/vector-icons/Feather';


export default function Intro({ event, eventID, userID }) {
  const router = useRouter();
  const { user } = useUser();
  const [isParticipating, setIsParticipating] = useState(false);
  const [participantList, setParticipantList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const encodedImageURL = encodeURIComponent(event?.imageURL)

  useEffect(() => {
    participantsVerification();
  }, []);

  useEffect(() => {
    const docRef = doc(db, 'EventList', eventID);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const favorites = docSnap.data().favorites || [];
        setIsFavorited(favorites.includes(user.uid));
      }
    });

    return () => unsubscribe(); 
  }, [eventID, user.uid]);

  useEffect(() => {
    const docRef = doc(db, 'EventList', eventID);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const participants = docSnap.data().participants || [];

        const isUserParticipating = participants.some(
          participant => participant.uid === user.uid
        );

        setIsParticipating(isUserParticipating);
      }
    });

    return () => unsubscribe();
  }, [eventID, user.uid]);


  

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
    setLoading(true);
    const docRef = doc(db, 'EventList', eventID);
  
    try {
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const currentParticipants = docSnap.data().participants || [];
  
        if (isParticipating) {
          const updatedParticipants = currentParticipants.filter(
            participant => participant.uid !== user.uid
          );
          
          await updateDoc(docRef, {
            participants: updatedParticipants
          });
          
          router.push('/extra-pages/ExitEventSucess');
        } else {
          const newParticipant = {
            uid: user.uid,
            username: user.username,
            userPicture: user.profilePicture
          };
          
          await updateDoc(docRef, {
            participants: [...currentParticipants, newParticipant]
          });
          
          router.push('/extra-pages/JoinEventSucess');
        }
      }
      
      setLoading(false);
      
    } catch (error) {
      console.log("Erro ao participar do evento: " + error);
      setLoading(false);
    }
  };

  const favoriteEvent = async () =>{
    try{
      const favoriteRef = doc(db, 'EventList', eventID)
      const userRef = doc(db, 'Users', user.uid);

      if (isFavorited){
        await updateDoc(favoriteRef, {
          favorites: arrayRemove(user.uid)
        })
        console.log("Evento removido dos favoritos com sucesso")

        await updateDoc(userRef, {
          userFavorites: arrayRemove(eventID)
        })
        console.log("Evento removido dos favoritos do usuário com sucesso")
      } else {

        await updateDoc(favoriteRef, {
          favorites: arrayUnion(user.uid)
        })
        console.log("Evento favoritado com sucesso")

        await updateDoc(userRef, {
          userFavorites: arrayUnion(eventID)
        });
        console.log("Evento adicionado aos favoritos do usuário com sucesso");
      }
      
    }
    catch(error){
      console.log("Erro ao adicionar nos favoritos: " + error)
    }
  }

  const ownerEventVerification = () => {
    if (event && event.userId === user.uid) {
      return true;
    } else {
      return false;
    }
  };

  

  const participantsVerification = async () => {
    const eventRef = doc(db, 'EventList', eventID);
    const eventDoc = await getDoc(eventRef);
    if (eventDoc.exists()) {
      const eventData = eventDoc.data();
      const participants = eventData.participants || [];
      const limitedParticipants = participants.slice(0,3)
      setParticipantList(limitedParticipants);
    }
  };

  const deleteEvent = async () => {
    if (!eventID) {
      console.error('ID do evento não está definido');
      return;
    }
  
    try {
      setLoading(true);
  
      await deleteDoc(doc(db, 'EventList', eventID));
  
      const storage = getStorage();
      const imageRef = ref(storage, `event-images/${eventID}.jpg`);
      await deleteObject(imageRef);
  
      setLoading(false);
      router.push('/extra-pages/DeletedEventSucess');
      
    } catch (error) {
      console.error('Erro ao excluir evento: ', error);
      setLoading(false);
    }
  };

  console.log("LINK DO EVENTO NA PAGINA DE DETALHES: ", event?.imageURL)

  const renderHeader = () => (
    <View>

      <Image
        style={{ width: '100%', height: 300, zIndex: 0}}
        source={{ uri: event?.imageURL }}
      />

      <View style={{
          display: 'flex',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.white,
          borderRadius: 30,
          position: 'absolute',
          top: 50,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          left: 30,
          padding: 3,
          zIndex: 1
        }}>
        <TouchableOpacity  onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color={Colors.blue} />
        </TouchableOpacity>
      </View>


      {/* <TouchableOpacity onPress={()=>{console.log(ownerEventVerification())}}>
        <Text>TESTE DE FUNÇÃO NO BOTÃO</Text>
      </TouchableOpacity> */}

      <View style={{ alignSelf: 'flex-start', padding: 30, width: '100%' }}>
        
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
          
        }}>
          
          <View style={{maxWidth: 300}}>
            <Text style={{ color: Colors.black, fontSize: 27, fontFamily: 'airbnbcereal-bold'}}>
              {event?.name}
            </Text>
          </View>


          <View style={{
            display: 'flex',
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}>
            {user?.uid === userID &&
              <TouchableOpacity onPress={() => onDelete()}>
                <FontAwesome name="trash" size={24} color="red" />
              </TouchableOpacity>
            }
            
            {user?.uid === userID &&
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => router.push({
                  pathname: '/edit-event',
                  params: {
                    imagem: encodeURIComponent(event.imageURL),
                    nome: event.name,
                    descricao: event.about,
                    data: event.date,
                    id: event.id,
                    endereco: event.adress
                  }
                })}
              >
              
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
            }


          

          <TouchableOpacity onPress={favoriteEvent}>
                <MaterialCommunityIcons
                  name={isFavorited ? "cards-heart" : "cards-heart-outline"}
                  size={28}
                  color={isFavorited ? "red" : "black"}
                />
            </TouchableOpacity>

            
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
            <Ionicons name="calendar" size={26} color={Colors.blue} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, color: Colors.black, fontFamily: 'airbnbcereal-bold', marginTop: -5, marginBottom: 5 , marginLeft:-4}}>
              {event?.date.split(',')[1]}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.gray, fontFamily: 'airbnbcereal-bold' }}>
              {event?.date}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
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
          <View style={{ marginLeft: 10, paddingRight: 30}}>
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
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
            <Text style={{ fontFamily: 'airbnbcereal-bold', fontSize: 18, marginTop: 25, opacity: 0.84 }}>Participantes</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => router.push({
                pathname: '/eventparticipants',
                params: event
              })}
            >
              <Text style={{ fontFamily: 'airbnbcereal-bold', fontSize: 13, marginTop: 25,  color: Colors.blue}}>Ver Todos</Text>
            </TouchableOpacity>
            
        </View>

      </View>
    </View>
  );

  const renderFooter = () => (
    
    <View>
      {ownerEventVerification() ? null : (
        !isParticipating ? (
          <TouchableOpacity
            style={{ position: 'relative', paddingLeft: 50, paddingRight: 50, bottom: '0%' }}
            onPress={() => joinEvent()}
          >
            <Button text={"PARTICIPAR"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingLeft: 50, paddingRight: 50 }}
            onPress={() => joinEvent()}
          >
            <Button text={"CANCELAR PRESENÇA"} />
          </TouchableOpacity>
        )
      )}
    </View>


  )
  if (loading){
    return <EventPageLoading  />
  }
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
