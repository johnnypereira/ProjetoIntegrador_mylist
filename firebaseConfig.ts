import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBnDduTDuJBzopx93XQL9f1L8hj2IubRFg",
  authDomain: "mylist-b3e70.firebaseapp.com",
  databaseURL: "https://mylist-b3e70-default-rtdb.firebaseio.com",
  projectId: "mylist-b3e70",
  storageBucket: "mylist-b3e70.firebasestorage.app",
  messagingSenderId: "1039728320838",
  appId: "1:1039728320838:web:34ce6dfaecba248f348547",
  measurementId: "G-J6VG3BLDES"
};

const app = initializeApp(firebaseConfig);

// Inicializando o Auth com persistência no AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
