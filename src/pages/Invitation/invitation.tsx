import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Usando FontAwesome5
import styles from './styles';

export default function Invitation() {
  const [search, setSearch] = useState('');
  const [invitations, setInvitations] = useState<string[]>([]);

  const filteredInvitations = invitations.filter(invite =>
    invite.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Convites para Evento</Text>

      {/* Barra de Pesquisa com Ícone de Lupa */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar convites..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Lista de Convites ou Mensagem de Nenhum Convite */}
      {filteredInvitations.length > 0 ? (
        <FlatList
          data={filteredInvitations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.invitationItem}>
              <Text style={styles.invitationText}>{item}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noInvitations}>Não há convites disponíveis.</Text>
      )}
    </View>
  );
}
