import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter, useLocalSearchParams  } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {db, storage} from '../../../configs/FireBaseConfig'
import { doc, setDoc } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../../UserContext';


export default function UserInfo() {
  const {user} = useUser()
const router = useRouter();
  
  const [userImage, setUserImage] = useState(null);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userBio, setUserBio] = useState('');

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUserImage(result?.assets[0]?.uri);
      console.log(result?.assets[0]?.uri);
    }
  };

  const saveUserInfo = async () => {
    if (!username || !userImage || !userBio || !fullname) {
      ToastAndroid.show('Por favor, preencha todas as informações', ToastAndroid.BOTTOM);
      return;
    }

    setLoading(true);
    try {
      const fileName = Date.now().toString() + ".jpg";
      const resp = await fetch(userImage);
      const blob = await resp.blob();

      const imageRef = ref(storage, 'user-images/' + fileName);

      await uploadBytes(imageRef, blob);
      console.log("File uploaded...");

      const downloadURL = await getDownloadURL(imageRef);
      console.log(downloadURL);
      
      await OnCreateUserInfo(downloadURL);
      ToastAndroid.show('Perfil salvo com sucesso', ToastAndroid.BOTTOM);
      router.replace('/home');
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Erro ao salvar perfil', ToastAndroid.BOTTOM);
    } finally {
      setLoading(false);
    }
  };

  const OnCreateUserInfo = async (imageURL) => {
    try {
        console.log(user?.uid)
      await setDoc(doc(db, "Users", user?.uid), {
        fullname: fullname,
        username: username,
        bio: userBio,
        profilePicture: imageURL,
        following: [],
        followers: []
      });
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Erro ao salvar perfil', ToastAndroid.BOTTOM);
    }
  };

  return (
    <ScrollView style={{
      height: '100%',
      backgroundColor: Colors.white
    }}>
      <View style={{
        paddingRight: 30,
        paddingLeft: 30,
        marginTop: '15%'
      }}>
      
      <TouchableOpacity
        onPress={()=> router.replace('auth/sign-in')}
      >
        <Image source={require('@/assets/images/arrow-back.png')}></Image>
      </TouchableOpacity>
      

      <View>
        <Text style={{
          fontFamily: 'airbnbcereal-bold',
          fontSize: 24,
          color: '#120d26',
          marginTop: 40,
          marginBottom: 13
        }}>Falta pouco para concluir seu cadastro</Text>

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
                {!userImage?<FontAwesome name="photo" size={42} color={Colors.blue} />:
                <Image 
                style={{width: 150, height: 150, borderRadius: 15}}
                source={{uri:userImage}} />

                }
                
            </View>
      </TouchableOpacity>

        <TextInput 
        placeholder='Nome Completo' 
        style={styles.input} 
        placeholderTextColor={Colors.gray}
        onChangeText={(value)=>setFullname(value)}/>


        <TextInput 
        placeholder='Username' 
        placeholderTextColor={Colors.gray}
        style={styles.input}
        onChangeText={(value)=>setUsername(value)}/>


        <TextInput 
        secureTextEntry={false} 
        placeholder='Sua Biografia'
        placeholderTextColor={Colors.gray} 
        style={styles.input}
        onChangeText={(value)=>setUserBio(value)}/>


        <TouchableOpacity 
        onPress={() => saveUserInfo()}
        style={styles.button}>
          <Text style={{
            color: Colors.white,
            fontFamily: 'airbnbcereal-bold',
            fontSize: 16,
            letterSpacing: 1,
            textAlign: 'center'
          }}>CONCLUIR</Text>
        </TouchableOpacity>

      </View>
      
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
    marginBottom: 17
  },
  button:{
    padding: 20,
    backgroundColor: '#3D56F0',
    borderRadius: 15,
    marginRight: 40,
    marginLeft: 40
  }
})