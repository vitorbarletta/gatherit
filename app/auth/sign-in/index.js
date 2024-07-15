import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './../../../configs/FireBaseConfig'


export default function SignIn() {
  
  const router = useRouter()
  
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()

  const onSignIn = () =>{

    if(!email && !password){
      ToastAndroid.show('Por favor, insira as credenciais corretamente', ToastAndroid.BOTTOM)
      return
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      router.replace('/home')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      if(errorCode == 'auth/invalid-credential'){
        ToastAndroid.show('Email ou senha incorretos', ToastAndroid.LONG)
      return
      }
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
      }}>
      
      <Image source={require('@/assets/images/gather-icon.jpg')}
        style={{
          justifyContent: 'center',
          margin: 'auto',
          marginTop: '15%'
        }}
      />

      <Text style={{
        fontSize: 35,
        fontFamily: 'airbnbcereal-bold',
        textAlign: 'center',
        color: '#37364a'
      }}>Gather</Text>

      <View>
        <Text style={{
          fontFamily: 'airbnbcereal-bold',
          fontSize: 24,
          color: '#120d26',
          marginTop: 40,
          marginBottom: 13
        }}>Entrar</Text>

        <TextInput
        onChangeText={(value)=>setEmail(value)}
        placeholder='abc@email.com' 
        style={styles.input}></TextInput>

        <TextInput 
        onChangeText={(value)=>setPassword(value)}
        secureTextEntry={true} 
        placeholder='Sua senha aqui' 
        style={styles.input}></TextInput>

        <TouchableOpacity 
        onPress={onSignIn}
        style={styles.button}>
          <Text style={{
            color: Colors.white,
            fontFamily: 'airbnbcereal-bold',
            fontSize: 16,
            letterSpacing: 1,
            textAlign: 'center'
          }}>ENTRAR</Text>
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
        }}>Ainda não tem uma conta? </Text>
        <TouchableOpacity
          onPress={()=> router.replace('auth/sign-up')}
        >
                  <Text style={{
                      fontSize: 15,
                      fontFamily: 'airbnbcereal-bold',
                      color: '#3D56F0',
                      textAlign: 'center'
                  }}
                  >Registre-se</Text>
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