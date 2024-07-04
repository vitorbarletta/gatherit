import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useUser } from '../UserContext';
import { getAuth, updateProfile, updatePhoneNumber } from 'firebase/auth';

export default function Profile() {
  const { user } = useUser();
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = () => {
    setLoading(true);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error('Usuário não autenticado.');
      setLoading(false);
      return;
    }

    // Atualiza o nome de exibição
    if (newDisplayName) {
      updateProfile(currentUser, {
        displayName: newDisplayName
      }).then(() => {
        console.log('Nome de exibição atualizado com sucesso!');
        setLoading(false);
      }).catch((error) => {
        console.error('Erro ao atualizar nome de exibição:', error);
        setLoading(false);
      });
    }

  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Email: {user.email}</Text>
      <Text>UID: {user.uid}</Text>
      {user.displayName && <Text>Nome: {user.displayName}</Text>}
      {user.photoURL && (
        <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
      )}
      <Text>Email Verificado: {user.emailVerified ? 'Sim' : 'Não'}</Text>
      {user.phoneNumber && <Text>Telefone: {user.phoneNumber}</Text>}
      <Text>Data de Criação: {new Date(user.metadata.creationTime).toLocaleString()}</Text>
      <Text>Último Login: {new Date(user.metadata.lastSignInTime).toLocaleString()}</Text>

      <TextInput
        style={styles.input}
        placeholder="Novo Nome de Exibição"
        value={newDisplayName}
        onChangeText={setNewDisplayName}
      />
      <Button
        title="Alterar Dados"
        onPress={handleUpdateProfile}
        disabled={loading}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
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
  },
});
