import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import Login from '../components/Login.jsx';
import { Redirect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '@/app/UserContext';
import AddEventLoading from '../app/extra-pages/AddEventLoading.jsx';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
global.alert = () => {}

export default function Index() {
  const { user, loading } = useUser();

  if (loading) {
    return <AddEventLoading />;
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href={'/home'} /> : <Login />}
    </View>
  );
}
