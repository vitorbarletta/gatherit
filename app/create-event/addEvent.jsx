import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid, ActivityIndicator } from 'react-native'
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


export default function AddEvent() {
    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [adress, setAdress] = useState()
    const [about, setAbout] = useState()
    const [date, setDate] = useState()
    const { user } = useUser();
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const onImagePick = async () =>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1});
        setImage(result?.assets[0].uri)
        console.log(result)
    }

    const onAddNewEvent = async () =>{
      setLoading(true)
      const fileName = Date.now().toString()+".jpg"
      const resp = await fetch(image)
      const blob = await resp.blob()

      const imageRef = ref(storage, 'event-images/'+fileName)

      uploadBytes(imageRef, blob).then((snapshot) =>{
        console.log("File uploaded...")
      }).then(resp => {
        getDownloadURL(imageRef).then(async(downloadURL) =>{
          console.log(downloadURL)
          saveEventDetail(downloadURL)
        })
      })
      setLoading(false)
    }

    const saveEventDetail = async (imageURL) => {
      await setDoc(doc(db, 'EventList', Date.now().toString()), {
        name: name,
        adress: adress,
        about: about,
        date: date,
        userId: user?.uid,
        userEmail: user?.email,
        imageURL: imageURL
      })
      setLoading(false)
      ToastAndroid.show("Novo evento adicionado", ToastAndroid.LONG)
      router.back()
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
      }}>Crie um novo evento</Text>

      <View style={{
        marginTop: 20
      }}>

      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 20}} onPress={() => onImagePick()}>
            
            <View style={{ position: 'relative', width: 150, height: 150, justifyContent: 'center', alignItems: 'center' }}>
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
                style={{width: 150, height: 150, borderRadius: 15}}
                source={{uri:image}} />

                }
                
            </View>
      </TouchableOpacity>


        <TextInput
          onChangeText={(value)=>setName(value)}
          placeholder='Nome*' 
          style={styles.input}></TextInput>

        <TextInput
          onChangeText={(value)=>setAdress(value)}
          placeholder='Endereço*' 
          style={styles.input}></TextInput>

        <TextInput
          onChangeText={(value)=>setAbout(value)}
          placeholder='Descrição*' 
          style={styles.input}></TextInput>

        <TextInput
          onChangeText={(value)=>setDate(value)}
          placeholder='Data*' 
          style={styles.input}></TextInput>

        <TouchableOpacity disabled={loading}  style={{paddingLeft: 50, paddingRight: 50}}
          onPress={() => onAddNewEvent()}
        >
          {loading?<ActivityIndicator size={'large'} color={Colors.blue} />:<Button text={"ADICIONAR NOVO EVENTO"}/>}

        </TouchableOpacity>
      </View>

    </View>
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