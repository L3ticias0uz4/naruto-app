import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../styles/theme';

// ─────────────────────────────────────────────
//  Loading
//  Props:
//    message {string} - mensagem exibida (opcional)
//    size    {'small'|'large'} (default 'large')
//    inline  {boolean} - true = sem flex:1
// ─────────────────────────────────────────────

export default function Loading({
  message = 'Carregando chakra...',
  size = 'large',
  inline = false,
}) {
  return (
    <View style={[styles.container, inline && styles.inline]}>
      <ActivityIndicator size={size} color={colors.primary} />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
  inline: {
    flex: 0,
    paddingVertical: spacing.lg,
  },
  text: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
