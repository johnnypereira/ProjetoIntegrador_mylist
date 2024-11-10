import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Alteração para usar setDoc
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import Logo from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../AppNavigator';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState<Date | undefined>(undefined);
  const [genero, setGenero] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!nome || !email || !senha || !dataNascimento || !genero) {
      Toast.show({
        text1: 'Por favor, preencha todos os campos!',
        type: 'error',
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        text1: 'O e-mail fornecido é inválido.',
        type: 'error',
      });
      return;
    }

    const db = getFirestore();
    const auth = getAuth();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Usando o UID do usuário para o ID do documento
      const docRef = doc(db, 'usuarios', user.uid);
      
      // Definindo os dados do usuário no documento
      await setDoc(docRef, {
        uid: user.uid,
        nome: nome,
        email: email,
        dataNascimento: dataNascimento?.toISOString().split('T')[0],
        genero: genero,
      });

      console.log('Usuário registrado com ID:', user.uid);

      Toast.show({
        text1: 'Registro realizado com sucesso!',
        type: 'success',
      });

      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Toast.show({
        text1: 'Erro ao registrar usuário.',
        type: 'error',
      });
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDataNascimento(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.infoText}>Crie sua conta</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome Completo"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
        <Ionicons name="person" size={24} color="gray" style={styles.icon} />
      </View>

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
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.dateInput} onPress={showDatePickerModal}>
        <Text style={styles.dateText}>
          {dataNascimento ? dataNascimento.toLocaleDateString() : 'Data de Nascimento'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataNascimento || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gênero</Text>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue) => setGenero(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o Gênero" value="" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Feminino" value="feminino" />
          <Picker.Item label="Outro" value="outro" />
        </Picker>
      </View>

      <Button title="Registrar" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
}
