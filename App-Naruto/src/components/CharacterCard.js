import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, natureColors } from '../styles/theme';

// ─────────────────────────────────────────────
//  CharacterCard
//  Props:
//    character  {object}   - dados do personagem
//    onPress    {function} - navega para detalhes
//    onFavorite {function} - toggle favorito
//    isFavorite {boolean}
// ─────────────────────────────────────────────

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.md * 2 - spacing.sm) / 2;

// Imagem placeholder local (base64 1×1 laranja) caso não haja imagem
const PLACEHOLDER = 'https://i.ibb.co/d0DqXKT/naruto-placeholder.png';

export default function CharacterCard({ character, onPress, onFavorite, isFavorite }) {
  const imageUri = character?.images?.[0] || PLACEHOLDER;
  const nature = character?.natureType?.[0];
  const natureColor = nature ? (natureColors[nature] || colors.primary) : colors.primary;
  const village = character?.personal?.affiliation;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalhes de ${character.name}`}
    >
      {/* Imagem */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="contain"
          defaultSource={{ uri: PLACEHOLDER }}
        />

        {/* Badge de natureza */}
        {nature && (
          <View style={[styles.natureBadge, { backgroundColor: natureColor + '33', borderColor: natureColor }]}>
            <Text style={[styles.natureText, { color: natureColor }]} numberOfLines={1}>
              {nature.replace(' Release', '')}
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{character.name}</Text>
        {village ? (
          <Text style={styles.village} numberOfLines={1}>🏠 {village}</Text>
        ) : null}
      </View>

      {/* Botão favoritar */}
      <TouchableOpacity
        style={styles.favBtn}
        onPress={onFavorite}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        <Text style={[styles.favIcon, isFavorite && styles.favActive]}>
          {isFavorite ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#2A2A2A',
    ...shadows.card,
  },
  imageWrapper: {
    height: CARD_WIDTH * 0.9,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  natureBadge: {
    position: 'absolute',
    bottom: spacing.xs,
    left: spacing.xs,
    borderRadius: borderRadius.sm,
    borderWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  natureText: {
    fontSize: 9,
    fontWeight: '600',
  },
  info: {
    padding: spacing.sm,
    gap: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 17,
  },
  village: {
    fontSize: 11,
    color: colors.textMuted,
  },
  favBtn: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    padding: 4,
  },
  favIcon: {
    fontSize: 16,
  },
  favActive: {
    // emoji já tem cor, mas podemos ajustar escala se quiser
  },
});
