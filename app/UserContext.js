import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../configs/FireBaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../configs/FireBaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddEventLoading from './extra-pages/AddEventLoading';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserFromAsyncStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          console.log(user)
        }
      } catch (e) {
        console.error('Failed to load user data:', e);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromAsyncStorage();
    
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, "Users", user.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()){
          const userData = userDocSnap.data()
          
          console.log("PESQUISOU NO BANCO DE DADOS E SETOU NA VARIAVEL SET USER")
          setUser({
              uid: user.uid,
              email: user.email,
              ...userData,
            });
          console.log(user)
        }
        
      } else {
        // console.log("Problema na autenticação e obtenção de dados do banco de dados: UserContext")
      }
    });

    return () => unsubscribe();
  }, []);
  
  if (loading) {
    return <AddEventLoading/>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
