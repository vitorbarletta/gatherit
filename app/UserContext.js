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
  const [loading, setLoading] = useState(true);
  const [isUserLoaded, setIsUserLoaded] = useState(false); // Novo estado para controlar o carregamento do AsyncStorage

  const updateUserData = async () => {
    if (user?.uid) {
      try {
        const userDocRef = doc(db, "Users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const updatedUserData = userDocSnap.data();
          setUser(prevUser => ({
            ...prevUser,
            ...updatedUserData,
          }));
          console.log("Usuário atualizado com sucesso:", updatedUserData);

          // Salva os dados atualizados no AsyncStorage
          await AsyncStorage.setItem('@user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            ...updatedUserData,
          }));
        }
      } catch (error) {
        console.error("Erro ao atualizar dados do usuário:", error);
      }
    }
  };

  useEffect(() => {
    const loadUserFromAsyncStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user');
        if (storedUser && !isUserLoaded) { // Carrega do AsyncStorage apenas se o usuário ainda não foi carregado
          setUser(JSON.parse(storedUser));
          console.log("SETOU DADOS")
        }
      } catch (e) {
        console.error('Falha ao carregar dados do usuário:', e);
      } finally {
        setLoading(false);
        setIsUserLoaded(true); // Define como true após o primeiro carregamento
      }
    };

    loadUserFromAsyncStorage();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        console.log("pesquisou no banco")

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUser({
            uid: user.uid,
            email: user.email,
            ...userData,
          });

          

          // Salva os dados atualizados no AsyncStorage
          await AsyncStorage.setItem('@user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            ...userData,
          }));
          console.log("setou novament")
        }
      }
    });

    return () => unsubscribe();
  }, [isUserLoaded]); // Adiciona isUserLoaded como dependência

  if (loading) {
    return <AddEventLoading />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
