import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Mudar para flex-start para que o título fique no topo
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start', // Faz o título ficar alinhado à esquerda
  },
  cardContainer: {
    width: '100%',
    marginBottom: 20,
  },
  cardBlue: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10, // Espaçamento entre os cards
    alignItems: 'center',
  },
  cardRed: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: 'gray',
  },
  listItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  // Adicione esta linha no seu styles.ts
  cardText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10, // Adicionando um espaço entre o ícone e o texto
  },
  // Adicione esta linha no seu styles.ts
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center', // Alinha o ícone e o texto verticalmente
  },
  
  
});

export default styles;
