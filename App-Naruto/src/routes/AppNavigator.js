import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';

// ─────────────────────────────────────────────
//  AppNavigator — Stack raiz
//  Fluxo: Tabs (Home / Favorites) → Detail
// ─────────────────────────────────────────────

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Abas principais */}
        <Stack.Screen name="Tabs" component={TabNavigator} />

        {/* Tela de detalhes acessada de qualquer aba */}
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            animation: 'slide_from_right',
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
