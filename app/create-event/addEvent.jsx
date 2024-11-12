import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Button from '../../components/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {db, storage} from '../../configs/FireBaseConfig'
import { doc, setDoc } from 'firebase/firestore';
import { useUser } from '../UserContext';
import { useRouter } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {format, parseISO} from 'date-fns'
import { ptBR } from 'date-fns/locale';
import AddEventLoading from '../extra-pages/AddEventLoading'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AddEvent() {
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [adress, setAdress] = useState()
    const [about, setAbout] = useState()
    const [date, setDate] = useState()
    const { user } = useUser();
    const [privacity, setPrivacity] = useState('public')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const EventIdentification = Date.now().toString()

    

    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const weekdays = [
      'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'
    ];
    

    const onDateChange = (date) => {
      const isoDate = date.toISOString();

      const formattedDate = format(parseISO(isoDate), "eeee, d 'de' MMMM 'de' yyyy", { locale: ptBR });

  
      setDate(formattedDate);
    };

    const onImagePick = async () =>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1});
        setImage(result?.assets[0].uri)
    }

    const onAddNewEvent = async () => {
      setLoading(true); 
  
      try {
        const fileName = EventIdentification + ".jpg";
        const resp = await fetch(image);
        const blob = await resp.blob();
        const imageRef = ref(storage, 'event-images/' + fileName);
  
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        await saveEventDetail(downloadURL);
      } catch (error) {
        console.error("Error adding event: ", error);
      } 
    }

    const saveEventDetail = async (imageURL) => {
      await setDoc(doc(db, 'EventList', EventIdentification), {
        id: EventIdentification,
        name: name,
        adress: adress,
        about: about,
        date: date,
        userId: user?.uid,
        userEmail: user?.email,
        imageURL: imageURL,
        username: user?.username,
        userFullName: user?.fullname,
        userProfilePicture: user?.profilePicture,
        participants: [],
        favorites: []
      })
      setLoading(false)
      router.push('/extra-pages/EventSucess')
      
    }

    if (loading){
      return <AddEventLoading />
    }

    return (
    <ScrollView
    style={{
      padding: 25,
      paddingTop: 65,
      backgroundColor: Colors.white,
      height: '100%'
    }}>
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
            }}>Crie um novo evento</Text>
        </View>

      <View style={{
        marginTop: 20
      }}>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20}} onPress={() => onImagePick()}>
            
            <View style={{ position: 'relative', width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
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
                {!image?<FontAwesome name="photo" size={42} color={Colors.blue} />:
                <Image 
                style={{width: '100%', height: 200, borderRadius: 15}}
                source={{uri:image}} />

                }
                
            </View>
      </TouchableOpacity>


        <TextInput
          onChangeText={(value)=>setName(value)}
          placeholder='Nome*'
          placeholderTextColor={Colors.gray}
          style={styles.input}></TextInput>

        <TextInput
          onChangeText={(value)=>setAdress(value)}
          placeholder='Endereço*' 
          placeholderTextColor={Colors.gray}
          style={styles.input}></TextInput>

        <TextInput
          onChangeText={(value)=>setAbout(value)}
          placeholder='Descrição*' 
          placeholderTextColor={Colors.gray}
          style={styles.input}></TextInput>

              
          
        <View style={{marginBottom: 20}}>
          <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={false}
          minDate={new Date()}
          selectedDayStyle={{backgroundColor: Colors.blue}}
          selectedDayTextColor={Colors.white}
          selectYearTitle='Selecione o ano'
          selectMonthTitle='Selecione o mês em '
          textStyle={{fontFamily: 'airbnbcereal-bold'}}
          height={360}
          width={360}
          months={months}
          weekdays={weekdays}
          nextTitle='Próximo'
          previousTitle='Anterior'
          />
        </View>

        <TouchableOpacity disabled={loading} style={{ paddingLeft: 50, paddingRight: 50, paddingBottom: 100 }} onPress={() => onAddNewEvent()}>
         <Button text={"ADICIONAR"} />
      </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input:{
    fontFamily: 'airbnbcereal-bold',
    fontSize: 14,
    color: '#747688',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E4DFDF',
    borderRadius: 12,
    marginBottom: 17,

  }
})