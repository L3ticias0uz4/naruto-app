import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../styles/theme';

// ─────────────────────────────────────────────
//  Header
//  Props:
//    title       {string}   - título principal
//    subtitle    {string}   - subtítulo opcional
//    rightIcon   {ReactNode} - componente à direita
//    onBack      {function} - se definido, exibe botão voltar
// ─────────────────────────────────────────────

export default function Header({ title, subtitle, rightIcon, onBack }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.row}>
        {/* Botão voltar */}
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn} hitSlop={8}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        ) : (
          /* Logo "〇" laranja quando não há botão voltar */
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>忍</Text>
          </View>
        )}

        {/* Texto central */}
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          ) : null}
        </View>

        {/* Ação direita */}
        <View style={styles.rightSlot}>
          {rightIcon || null}
        </View>
      </View>

      {/* Linha separadora */}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.overlay,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '600',
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 1,
  },
  rightSlot: {
    minWidth: 36,
    alignItems: 'flex-end',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#2A2A2A',
    marginTop: spacing.sm,
  },
});
