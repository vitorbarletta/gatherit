import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useUser } from '../UserContext';
import { Colors } from '../../constants/Colors';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Profile() {
  const { user } = useUser();
  
  return (
    <View style={styles.container}>
      

      <Text style={{
        fontSize: 24,
        fontFamily: 'airbnbcereal-bold'
      }}>Seu Perfil</Text>

      <View style={{
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Image 
        style={styles.profileImage}
        source={{uri: user?.profilePicture}}>
        </Image>

        <Text
          style={{
            fontSize: 24,
            fontFamily: 'airbnbcereal-bold'
          }}
        >{user?.username}</Text>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 30,
          marginTop: 15
        }}>
          <View>
            <Text style={styles.followersNumber}>350</Text>
            <Text style={styles.followersText}>Seguindo</Text>
          </View>

          <View>
            <Text style={styles.followersNumber}>330</Text>
            <Text style={styles.followersText}>Seguidores</Text>
          </View>
        </View>

        <View style={{
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          borderWidth: 2,
          borderColor: Colors.blue,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 15,
          paddingRight: 15,
          borderRadius: 10,
          marginTop: 20,
          gap: 10
          }}>
          <Feather name="edit" size={24} color={Colors.blue} />
          <Text style={{fontSize: 16, fontFamily: 'airbnbcereal-bold', color: Colors.blue}}>Editar Perfil</Text>
        </View>

        <TouchableOpacity onPress={() => router.replace('/auth/sign-in')} style={{borderColor: Colors.black, borderWidth: 1, margin: 10, padding: 10}}>
          <Text>Botão LOGIN</Text>
        </TouchableOpacity>

      </View>

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
  
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#000'
  },

  followersNumber: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'airbnbcereal-bold'
  },

  followersText:{
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'airbnbcereal-book'
  }
});
