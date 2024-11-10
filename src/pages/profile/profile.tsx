import React, { useState, useEffect } from 'react';
import { View, Text, Image, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';  // Mantenha a importação do auth
import { signOut } from 'firebase/auth';  // Importando corretamente o signOut do Firebase
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './styles';
import { RootStackParamList } from '../../../AppNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [isAvailable, setIsAvailable] = useState(true);
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');

  const toggleStatus = () => {
    setIsAvailable(previousState => !previousState);
  };

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.nome);
          setUserEmail(userData.email);
          setUserGender(userData.genero);
          setUserAge(calculateAge(new Date(userData.dataNascimento))); 
        } else {
          console.log('Usuário não encontrado no Firestore');
        }
      } else {
        console.log('Nenhum usuário logado');
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário: ", error);
    }
  };

  const calculateAge = (birthDate: Date) => {
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Função de Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Realiza o logout do Firebase
      navigation.reset({ routes: [{ name: 'Login' }] });  // Redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar sair.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }} 
        style={styles.profileImage}
      />
      <Text style={styles.userName}>{userName || 'Carregando...'}</Text>

      <View style={styles.dataContainer}>
        <View style={styles.dataRow}>
          <Ionicons name="person" size={24} color="#007FFF" style={styles.icon} />
          <Text style={styles.dataText}>Nome: {userName || 'Carregando...'}</Text>
        </View>
        <View style={styles.dataRow}>
          <Ionicons name="calendar" size={24} color="#007FFF" style={styles.icon} />
          <Text style={styles.dataText}>Idade: {userAge || 'Carregando...'}</Text>
        </View>
        <View style={styles.dataRow}>
          <Ionicons name="mail" size={24} color="#007FFF" style={styles.icon} />
          <Text style={styles.dataText}>Email: {userEmail || 'Carregando...'}</Text>
        </View>
        <View style={styles.dataRow}>
          <Ionicons name="male-female" size={24} color="#007FFF" style={styles.icon} />
          <Text style={styles.dataText}>Gênero: {userGender || 'Carregando...'}</Text>
        </View>
      </View>

      {/* Status do usuário */}
      <View style={styles.statusContainer}>
        <Switch
          value={isAvailable}
          onValueChange={toggleStatus}
          thumbColor={isAvailable ? 'white' : 'gray'}
          trackColor={{ false: 'red', true: 'green' }}
        />
        <Text style={styles.statusLabel}>
          Status: {isAvailable ? 'Disponível' : 'Ocupado'}
        </Text>
      </View>

      {/* Botões de Configuração e Sair */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} style={styles.settingsButton}>
          <Ionicons name="settings" size={30} color="#007FFF" />
          <Text style={styles.settingsText}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out" size={30} color="red" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Links de Termos de Uso e Política de Privacidade */}
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => Alert.alert('Terms of Use', 'Aqui você pode redirecionar para os termos de uso.')}>
          <Text style={styles.link}>Termos de Uso</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Privacy Policy', 'Aqui você pode redirecionar para a política de privacidade.')}>
          <Text style={styles.link}>Política de Privacidade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
