import { StyleSheet, Dimensions } from 'react-native';
import { colors, spacing, borderRadius } from './theme';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  // ── Containers ──────────────────────────────
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // ── Texto ────────────────────────────────────
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
  },

  // ── Cards ────────────────────────────────────
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 0.5,
    borderColor: '#2A2A2A',
  },

  // ── Divisores ───────────────────────────────
  divider: {
    height: 0.5,
    backgroundColor: '#2A2A2A',
    marginVertical: spacing.sm,
  },

  // ── Estados vazios / erro ───────────────────
  emptyText: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },

  // ── Grid helpers ─────────────────────────────
  screenWidth: width,
  cardWidth: (width - spacing.md * 2 - spacing.sm) / 2,
});
