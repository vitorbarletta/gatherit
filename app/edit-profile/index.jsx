import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Button from '../../components/Button';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {auth, db, storage} from '../../configs/FireBaseConfig'
import { doc, updateDoc  } from 'firebase/firestore';
import { useUser } from '../UserContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AddEventLoading from '../extra-pages/AddEventLoading'
import AntDesign from '@expo/vector-icons/AntDesign';
import { updateEmail, updatePassword } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';


export default function EditProfile() {
    const { user, updateUserData } = useUser();

    const [username, setUsername] = useState(user.username)
    const [profilePicture, setProfilePicture] = useState(user.profilePicture)
    const [fullname, setFullname] = useState(user.fullname)
    const [bio, setBio] = useState(user.bio)
    const [email, setEmail] = useState(user.email); // Novo campo de email
    const [password, setPassword] = useState(''); // Novo campo de senha
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [image, setImage] = useState(profilePicture)

    const maxLength150 = 150
    const maxLength30 = 30

    useFocusEffect(
        React.useCallback(() => {
          updateUserData();
          console.log(auth.currentUser)
        }, [])
      );

    useEffect(()=>{
        updateUserData();
    }, [])


    const onImagePick = async () =>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1});
        setImage(result?.assets[0].uri)
    }

    const onEditProfile = async () => {
      setLoading(true);

      try {
          let imageURL = profilePicture; // Inicialmente, use a URL existente do banco de dados

          if (!image.startsWith("https")) {
              const fileName = user.uid + ".jpg";
              const resp = await fetch(image);
              const blob = await resp.blob();
              const imageRef = ref(storage, 'user-images/' + fileName);

              await uploadBytes(imageRef, blob);
              imageURL = await getDownloadURL(imageRef); // Atualiza a URL da imagem
          }

          await updateDoc(doc(db, 'Users', user.uid), {
            bio: bio,
            fullname: fullname,
            profilePicture: imageURL,
            username: username
          });

          if (email !== user.email){
            await updateEmail(auth.currentUser, email)
          }

          if (password){
            await updatePassword(auth.currentUser, password)
          }

          router.push('/extra-pages/EditEventSucess');
      } catch (error) {
          console.error("Erro ao editar evento: ", error);
      } finally {
          setLoading(false);
      }
  };

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
            }}>Editar Perfil</Text>
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

        <View style={{marginBottom: 17}}>
            <TextInput
            onChangeText={(value)=>setUsername(value)}
            placeholder='Username*'
            defaultValue={username}
            maxLength={30}
            placeholderTextColor={Colors.gray}
            style={styles.input}></TextInput>

            <Text style={{
                textAlign: 'right', 
                fontFamily: 'airbnbcereal-bold',
                fontSize: 10,
                color: '#747688'}}>{username.length}/{maxLength30}
            </Text>
        </View>
        
        <View style={{marginBottom: 17}}>
            <TextInput
            onChangeText={(value)=>setFullname(value)}
            placeholder='Nome*'
            defaultValue={fullname}
            maxLength={30}
            placeholderTextColor={Colors.gray}
            style={styles.input}></TextInput>
            

            <Text style={{
                textAlign: 'right', 
                fontFamily: 'airbnbcereal-bold',
                fontSize: 10,
                color: '#747688'}}>{fullname.length}/{maxLength30}
            </Text>
        </View>
       

        <View style={{marginBottom: 17}}>
            <TextInput
            onChangeText={(value)=>setBio(value)}
            placeholder='Biografia*'
            defaultValue={bio}
            multiline={true}
            maxLength={150}
            placeholderTextColor={Colors.gray}
            style={styles.input}></TextInput>

            <Text style={{
                textAlign: 'right', 
                fontFamily: 'airbnbcereal-bold',
                fontSize: 11,
                color: '#747688'}}>{bio.length}/{maxLength150}
            </Text>
        </View>
        
        <View style={{marginBottom: 17}}>
            <TextInput
                onChangeText={(value) => setEmail(value)}
                placeholder='Email*'
                defaultValue={email}
                placeholderTextColor={Colors.gray}
                style={styles.input}
            /> 
        </View>
        
        <View style={{marginBottom: 17}}>
            <TextInput
                onChangeText={(value) => setPassword(value)}
                placeholder='Senha*'
                placeholderTextColor={Colors.gray}
                style={styles.input}
                secureTextEntry
            />
        </View>

        <View>
            <TouchableOpacity disabled={loading} style={{ paddingLeft: 50, paddingRight: 50}} onPress={() => onEditProfile()}>
                <Button text={"SALVAR"} />
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


  }
})