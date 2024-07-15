import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'


export default function SearchPlace() {
    
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
        <TextInput
          onChangeText={(value)=>setEmail(value)}
          placeholder='Nome' 
          style={styles.input}></TextInput>

        <TextInput
          onChangeText={(value)=>setEmail(value)}
          placeholder='Endereço' 
          style={styles.input}></TextInput>

        <TextInput
          onChangeText={(value)=>setEmail(value)}
          placeholder='Descrição' 
          style={styles.input}></TextInput>

        <TextInput
          onChangeText={(value)=>setEmail(value)}
          placeholder='abc@email.com' 
          style={styles.input}></TextInput>
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