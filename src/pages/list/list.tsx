import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importando o ícone
import styles from './styles'; // Ajuste o caminho conforme necessário

// Supondo que as listas sejam strings
type UserList = string;

export default function List() {
  const userLists: UserList[] = []; // Definindo explicitamente o tipo da variável

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Listas de Eventos Esportivos</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.cardBlue}>
          <View style={styles.cardContent}>
            <Icon name="add" size={24} color="white" />
            <Text style={styles.cardText}> Criar uma Lista</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardRed}>
          <View style={styles.cardContent}>
            <Icon name="group-add" size={24} color="white" />
            <Text style={styles.cardText}> Participar de uma Lista</Text>
          </View>
        </TouchableOpacity>
      </View>

      {userLists.length === 0 ? (
        <Text style={styles.emptyMessage}>Você não está participando de nenhum evento.</Text>
      ) : (
        // Aqui você deve mapear e renderizar as listas do usuário
        userLists.map((list, index) => (
          <Text key={index} style={styles.listItem}>{list}</Text>
        ))
      )}
    </View>
  );
}
