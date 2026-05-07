import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../styles/theme';

// ─────────────────────────────────────────────
//  StatBar
//  Props:
//    label {string} - nome do stat
//    value {number} - valor (0-100+)
//    max   {number} - valor máximo para normalizar a barra (default 200)
//    color {string} - cor da barra
// ─────────────────────────────────────────────

export default function StatBar({ label, value, max = 200, color = colors.primary }) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ?? '—'}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs + 2,
  },
  label: {
    width: 90,
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
  },
  value: {
    width: 32,
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '700',
    textAlign: 'right',
  },
  track: {
    flex: 1,
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
