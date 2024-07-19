import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useUser } from '../UserContext';
import { Colors } from '../../constants/Colors';

export default function Profile() {
  const { user } = useUser();
  
  return (
    <View style={styles.container}>
      

      <Text style={{
        fontSize: 24,
        fontFamily: 'airbnbcereal-bold'
      }}>Seu Perfil</Text>


      <Text>{user?.uid}</Text>

      <Image 
      style={{height: 100, width: 100}}
      source={{uri: user?.profilePicture}}></Image>

      <TouchableOpacity onPress={() => console.log(user)}>

      <Text>TESTANDO BOTÃO PARA APARECER DADOS</Text></TouchableOpacity>


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 65,
    backgroundColor: Colors.white,
    height: '100%'
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: '#000'
  },
});
