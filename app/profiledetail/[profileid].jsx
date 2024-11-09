import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator, FlatList  } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getDoc, doc, query, collection, where, getDocs } from 'firebase/firestore'
import { db } from '../../configs/FireBaseConfig'
import { Colors } from '../../constants/Colors'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import MyEventsCard from '../../components/MyEventsCard';
import SmallEventListCard from '../../components/SmallEventListCard';


export default function ProfileDetail() {
  
    const {profileid} = useLocalSearchParams()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [selectedTab, setSelectedTab] = useState('participating'); // Define a aba padrão
    const [createdEvents, setCreatedEvents] = useState([])
    const [participatingEvents, setParticipatingEvents] = useState([]);


      
    useEffect(()=>{
        GetUserDetailByUID()
        GetUserEvents()
    }, [])

    const GetUserDetailByUID = async () =>{
        setLoading(true)
        const docRef = doc(db, 'Users', profileid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()){
            setUser(docSnap.data())
            setLoading(false)
        } else {
            console.log("No such document")
            setLoading(false)
        }
    }

    const GetUserEvents = async () =>{
      try {
        setLoading(true);
  
        const eventsRef = collection(db, 'EventList');
        const eventsSnapshot = await getDocs(eventsRef);
  
        const participating = [];
        const created = [];
  
        eventsSnapshot.forEach((doc) => {
          const eventData = doc.data();
  
          if (eventData.userId === profileid) {
            created.push({
              id: doc.id,
              ...eventData,
            });
          }
  
          const isUserParticipating = eventData.participants?.some(
            (participant) => participant.uid === profileid
          );
  
          if (isUserParticipating) {
            participating.push({
              id: doc.id,
              ...eventData,
            });
          }
        });
  
        setCreatedEvents(created);
        setParticipatingEvents(participating);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        setLoading(false);
      }
    }

    const renderEventItem = ({ item }) => (
      <View style={styles.eventItem}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.eventDate}>{item.date}</Text>
      </View>
  );
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{position: 'absolute', left: 0}} onPress={() => router.back()}>
                    <AntDesign name="arrowleft" size={27} color="black" />
                </TouchableOpacity>

                <Text style={styles.usernameText}>{user?.username}</Text>

            </View>

            <View style={{width: '100%'}}>
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.blue} />
                ) : (
                    <>

                      <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>

                        <View style={{flex: 0.3}}>
                          <Image 
                                style={styles.profileImage}
                                source={{ uri: user?.profilePicture }}
                            />
                        </View>
                        
                        
                        <View style={{
                          flexDirection: 'row',
                          flex: 0.7,
                          justifyContent: 'space-evenly'
                        }}>

                          <View>
                                <Text style={styles.followersNumber}>{user?.followers.length}</Text>
                                <Text style={styles.followersText}>Seguidores</Text>
                          </View>

                          <View>
                                <Text style={styles.followersNumber}>{user?.following.length}</Text>
                                <Text style={styles.followersText}>Seguidores</Text>
                          </View>

                        </View>


                      </View>

                      <View>
                        <Text style={{
                          fontSize: 14,
                          fontFamily: 'airbnbcereal-bold',
                          marginBottom: 3
                        }}>
                          {user?.fullname}
                        </Text>

                        <Text style={{
                          fontSize: 14,
                          fontFamily: 'airbnbcereal-medium'
                        }}>
                          {user?.bio}
                        </Text>
                      </View>

                      <View style={styles.buttonContainer}>
                          <TouchableOpacity style={styles.followButton}>
                              <Text style={styles.followButtonText}>Seguir</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.messageButton}>
                              <Text style={styles.messageButtonText}>Mensagem</Text>
                          </TouchableOpacity>
                      </View>

                      <View style={styles.tabContainer}>
                          <TouchableOpacity
                              style={[styles.tab, selectedTab === 'participating' && styles.activeTab]}
                              onPress={() => setSelectedTab('participating')}
                          >
                              <Text style={[styles.tabText, selectedTab === 'participating' && styles.activeTabText]}>
                                  Participando
                              </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={[styles.tab, selectedTab === 'created' && styles.activeTab]}
                              onPress={() => setSelectedTab('created')}
                          >
                              <Text style={[styles.tabText, selectedTab === 'created' && styles.activeTabText]}>
                                  Criados
                              </Text>
                          </TouchableOpacity>
                      </View>

                      <FlatList
                            data={selectedTab === 'participating' ? participatingEvents : createdEvents}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => (
                              <SmallEventListCard event={item}/>
                            )}
                            style={{ marginTop: 5 }}
                            contentContainerStyle={{ flexGrow: 1, paddingTop: 15 }}
                            ListFooterComponent={<View style={{ height: 330 }} />}
                      />
                    </>
                )}
            </View>
        </View>
  
    );
}
const styles = StyleSheet.create({
  container: {
      padding: 25,
      paddingTop: 65,
      backgroundColor: Colors.white,
      flex:1,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center'
  },
  profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginTop: 30,
      marginBottom: 15,
      backgroundColor: '#000',
  },
  usernameText: {
      fontSize: 18,
      fontFamily: 'airbnbcereal-bold',
      textAlign: 'center'
  },
  followersNumber: {
      textAlign: 'center',
      fontSize: 17,
      fontFamily: 'airbnbcereal-bold',
  },
  followersText: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'airbnbcereal-book',
  },
  buttonContainer: {
      flexDirection: 'row',
      marginTop: 20,
      gap: 10,
  },
  followButton: {
      backgroundColor: Colors.blue,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 10,
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
  },
  followButtonText: {
      color: Colors.white,
      fontSize: 16,
      fontFamily: 'airbnbcereal-bold',
  },
  messageButton: {
      borderColor: Colors.blue,
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 10,
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
  },
  messageButtonText: {
      color: Colors.blue,
      fontSize: 16,
      fontFamily: 'airbnbcereal-bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
  },
  activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.blue,
  },
  tabText: {
      fontSize: 16,
      fontFamily: 'airbnbcereal-bold',
      color: Colors.gray,  // Cor padrão para o texto inativo
  },
  activeTabText: {
      color: Colors.blue,  // Cor para o texto da aba ativa
  },
  eventItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  eventName: {
      fontSize: 16,
      fontFamily: 'airbnbcereal-bold',
  },
  eventDate: {
      fontSize: 14,
      color: Colors.gray,
  },
});
