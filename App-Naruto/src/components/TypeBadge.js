import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, natureColors } from '../styles/theme';

// ─────────────────────────────────────────────
//  TypeBadge
//  Props:
//    label {string} - nome do tipo (ex: "Fire Release")
// ─────────────────────────────────────────────

export default function TypeBadge({ label }) {
  const color = natureColors[label] || colors.primary;
  return (
    <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color + '55' }]}>
      <Text style={[styles.text, { color }]}>
        {label.replace(' Release', '')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.sm,
    borderWidth: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
