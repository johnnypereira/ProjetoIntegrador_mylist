import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',  // Alinha ícone e texto lado a lado
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#007BFF',  // Cor azul para o botão "Salvar"
  },
  cancelButton: {
    backgroundColor: 'red',  // Cor vermelha para o botão "Cancelar"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 8,  // Espaçamento entre o ícone e o texto
  },
  icon: {
    marginRight: 8,  // Espaçamento entre o ícone e o texto
  },
});

export default styles;
