import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './../../../configs/FireBaseConfig'

export default function SignUp() {
  
  const router = useRouter()
  
  
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()

  const OnCreateAccount = () =>{

    if (!email && !password){
      ToastAndroid.show('Por favor, insira as credenciais corretamente', ToastAndroid.BOTTOM)
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace('/auth/user-info')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        // ..
      });
  }
  return (
    <View style={{
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
        }}>Registrar</Text>


        <TextInput 
        placeholder='abc@email.com'
        placeholderTextColor={Colors.gray}
        style={styles.input}
        onChangeText={(value)=>setEmail(value)}/>


        <TextInput 
        secureTextEntry={true} 
        placeholder='Sua senha' 
        placeholderTextColor={Colors.gray}
        style={styles.input}
        onChangeText={(value)=>setPassword(value)}/>


        <TouchableOpacity 
        onPress={OnCreateAccount}
        style={styles.button}>
          <Text style={{
            color: Colors.white,
            fontFamily: 'airbnbcereal-bold',
            fontSize: 16,
            letterSpacing: 1,
            textAlign: 'center'
          }}>REGISTRAR</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row',
        marginTop: 20,
        margin: 'auto'
      }}>
        <Text style={{
          fontSize: 15,
          fontFamily: 'airbnbcereal-bold',
          color: '#120D26',
          textAlign: 'center'
        }}>Já tem uma conta? </Text>
        <TouchableOpacity
          onPress={()=>router.replace('auth/sign-in')}
        >
                  <Text style={{
                      fontSize: 15,
                      fontFamily: 'airbnbcereal-bold',
                      color: '#3D56F0',
                      textAlign: 'center'
                  }}
                  >Entrar</Text>
        </TouchableOpacity>
      </View>
      
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