import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1, // O campo de e-mail ocupa todo o espaço disponível
    padding: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1, // Isso permite que o campo de senha ocupe todo o espaço disponível
    padding: 10,
  },
  icon: {
    padding: 10, // Adiciona espaçamento ao redor do ícone
    backgroundColor: 'transparent', // Mantém o fundo transparente
  },
  registerText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default styles;
