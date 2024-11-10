import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/login/login'; 
import Register from './src/pages/register/register'; 
import Home from './src/pages/home/home'; 
import SettingsScreen from './src/pages/settingsscreen/settingsscreen';

// Definindo o tipo do parâmetro da navegação
export type RootStackParamList = {
  Login: undefined; 
  Register: undefined; 
  Home: undefined; 
  SettingsScreen: undefined;
  Profile: undefined;
};

// Criando o Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
