import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import { colors, borderRadius } from '../styles/theme';

// ─────────────────────────────────────────────
//  TabNavigator — Navegação inferior
//  Abas: Ninjas | Favoritos
// ─────────────────────────────────────────────

const Tab = createBottomTabNavigator();

function TabIcon({ emoji, label, focused }) {
  return (
    <View style={[tabStyles.icon, focused && tabStyles.iconFocused]}>
      <Text style={{ fontSize: focused ? 20 : 18 }}>{emoji}</Text>
      <Text style={[tabStyles.label, focused && tabStyles.labelFocused]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyles.bar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🥷" label="Ninjas" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="❤️" label="Favoritos" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  bar: {
    backgroundColor: colors.overlay,
    borderTopWidth: 0.5,
    borderTopColor: '#2A2A2A',
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
  },
  icon: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
  },
  iconFocused: {
    backgroundColor: colors.primary + '18',
  },
  label: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '500',
  },
  labelFocused: {
    color: colors.primary,
    fontWeight: '700',
  },
});
