import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity } from 'react-native'; // Adicionei o TextInput aqui
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebaseConfig';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import styles from './styles';
import Logo from '../../assets/logo.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../AppNavigator';
import { FirebaseError } from 'firebase/app';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe a biblioteca de ícones
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa o DateTimePicker
import { Picker } from '@react-native-picker/picker'; // Importa o Picker para gênero

export default function SettingsScreen() {
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.nome || '');
          setBirthDate(userData.dataNascimento ? new Date(userData.dataNascimento) : undefined);
          setGender(userData.genero || '');
        }
      }
    };
    fetchUserData();
  }, []);

  const isPasswordValid = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleSaveChanges = async () => {
    const user = auth.currentUser;
    if (!name || !birthDate || !gender || !currentPassword) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (newPassword && !isPasswordValid(newPassword)) {
      Alert.alert('Erro', 'A nova senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    const email = user?.email ?? '';
    const credential = EmailAuthProvider.credential(email, currentPassword);

    try {
      await reauthenticateWithCredential(user!, credential);

      const db = getFirestore();
      const userRef = doc(db, 'usuarios', user!.uid);

      await updateDoc(userRef, {
        nome: name,
        dataNascimento: birthDate.toISOString(),
        genero: gender,
      });

      if (newPassword) {
        if (newPassword === currentPassword) {
          Alert.alert('Erro', 'A nova senha não pode ser igual à senha atual.');
          return;
        }
        await updatePassword(user!, newPassword);
      }

      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Erro', 'Senha atual incorreta.');
        } else {
          Alert.alert('Erro', 'Erro ao salvar dados, tente novamente mais tarde.');
        }
      } else {
        Alert.alert('Erro', 'Erro desconhecido, tente novamente mais tarde.');
      }
    }
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  // Função para mostrar o DateTimePicker
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Configurações do Perfil</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Picker para a data de nascimento */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{birthDate ? birthDate.toLocaleDateString() : 'Selecione a data de nascimento'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Picker para o gênero */}
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Selecione o Gênero" value="" />
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
        <Picker.Item label="Outro" value="Outro" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Senha Atual"
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha (opcional)"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveChanges}>
          <Icon name="save" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Icon name="times" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
