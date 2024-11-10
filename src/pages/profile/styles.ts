import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dataContainer: {
    width: '100%',
    marginTop: 20,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 10,
  },
  dataText: {
    fontSize: 16,
    color: 'gray',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  statusLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza os botões
    alignItems: 'center', // Alinha os itens verticalmente no centro
    width: '100%', // Garante que o container ocupe a largura total
    marginTop: 30,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,  // Pequeno espaço à direita para separação
  },
  settingsText: {
    fontSize: 16,
    color: '#007FFF',
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
  },
  linkContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
    color: '#007FFF',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});

export default styles;
