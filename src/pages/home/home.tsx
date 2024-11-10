import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../profile/profile';
import Invitation from '../Invitation/invitation';
import List from '../list/list';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../AppNavigator'; // Ajuste o caminho se necessário

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Tab = createBottomTabNavigator();

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1 }}>
      {/* Navegação com Bottom Tabs */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Removendo o cabeçalho
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Invitation') {
              iconName = 'mail';
            } else if (route.name === 'List') {
              iconName = 'list';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Invitation" component={Invitation} />
        <Tab.Screen name="List" component={List} />
      </Tab.Navigator>
    </View>
  );
}
