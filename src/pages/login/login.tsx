import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Toast from 'react-native-toast-message'; 
import styles from './styles';  
import Logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../../../AppNavigator'; 
import { auth } from '../../../firebaseConfig'; // Importando a configuração do Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importando a função de login
import { FirebaseError } from 'firebase/app'; // Importando FirebaseError para tratamento de erros

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>; 

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>(); 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        text1: 'Por favor, preencha todos os campos!',
        type: 'error',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        text1: 'Login efetuado com sucesso!',
        type: 'success',
      });

      // Atrasar a navegação para a tela Home
      setTimeout(() => {
        navigation.reset({ routes: [{ name: "Home" }] }); // Redirecionar para a tela Home
      }, 1000); // Atraso de 1 segundo
    } catch (error) {
      // Assegura que o erro é do tipo FirebaseError
      const firebaseError = error as FirebaseError;

      let errorMessage = 'E-mail ou senha incorretos!';
      if (firebaseError.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado.';
      } else if (firebaseError.code === 'auth/wrong-password') {
        errorMessage = 'Senha incorreta.';
      }

      Toast.show({
        text1: errorMessage,
        type: 'error',
      });
    }
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register'); 
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.infoText}>Bem-vindo! Faça login para continuar.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Ionicons name="mail" size={24} color="gray" style={styles.icon} />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          style={styles.passwordInput}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleRegisterNavigation}>
        <Text style={styles.registerText}>Ainda não tem uma conta? Registre-se</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}
