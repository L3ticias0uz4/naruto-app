import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import TypeBadge from '../components/TypeBadge';
import ErrorView from '../components/ErrorView';
import { fetchCharacterById } from '../services/narutoService';
import { useFavorites } from '../hooks/useFavorites';
import { colors, spacing, borderRadius, natureColors } from '../styles/theme';

// ─────────────────────────────────────────────
//  DetailScreen — Detalhes do Personagem
//  Recebe: route.params.characterId, characterName
// ─────────────────────────────────────────────

const { width } = Dimensions.get('window');

export default function DetailScreen({ route, navigation }) {
  const { characterId, characterName } = route.params;
  const [character, setCharacter]       = useState(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const { isFavorite, toggleFavorite }  = useFavorites();

  const favorite = character ? isFavorite(character.id) : false;

  // ── Busca personagem ─────────────────────────
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacterById(characterId);
      setCharacter(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [characterId]);

  useEffect(() => {
    load();
  }, [load]);

  // ── Header com botão favoritar ───────────────
  const FavButton = () => (
    <TouchableOpacity
      onPress={() => character && toggleFavorite(character)}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={favorite ? 'Remover dos favoritos' : 'Favoritar'}
    >
      <Text style={{ fontSize: 22 }}>{favorite ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
        <Header title={characterName} onBack={() => navigation.goBack()} />
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Consultando o pergaminho...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
        <Header title={characterName} onBack={() => navigation.goBack()} />
        <ErrorView message={error} onRetry={load} />
      </SafeAreaView>
    );
  }

  if (!character) return null;

  const imageUri  = character.images?.[0];
  const personal  = character.personal || {};
  const jutsu     = character.jutsu || [];
  const natures   = character.natureType || [];
  const debut     = character.debut || {};
  const family    = character.family || {};
  const uniqueTraits = character.uniqueTraits || [];

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
      <Header
        title={character.name}
        onBack={() => navigation.goBack()}
        rightIcon={<FavButton />}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Imagem principal ── */}
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.noImage}>🥷</Text>
            )}
          </View>

          {/* Nome + rank */}
          <Text style={styles.name}>{character.name}</Text>
          {personal.rank && (
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{personal.rank}</Text>
            </View>
          )}
        </View>

        {/* ── Naturezas de Chakra ── */}
        {natures.length > 0 && (
          <Section title="Natureza de Chakra">
            <View style={styles.badgesRow}>
              {natures.map((n) => <TypeBadge key={n} label={n} />)}
            </View>
          </Section>
        )}

        {/* ── Informações pessoais ── */}
        <Section title="Informações">
          {personal.status && <InfoRow label="Status" value={personal.status} />}
          {personal.affiliation && <InfoRow label="Afiliação" value={personal.affiliation} />}
          {personal.clan && <InfoRow label="Clã" value={personal.clan} />}
          {personal.kekkeiGenkai && <InfoRow label="Kekkei Genkai" value={personal.kekkeiGenkai} />}
          {personal.classification && <InfoRow label="Classificação" value={personal.classification} />}
          {personal.species && <InfoRow label="Espécie" value={personal.species} />}
          {debut.appearsIn && <InfoRow label="Aparece em" value={debut.appearsIn} />}
          {debut.anime && <InfoRow label="Estreia (anime)" value={debut.anime} />}
          {debut.manga && <InfoRow label="Estreia (manga)" value={debut.manga} />}
        </Section>

        {/* ── Jutsu ── */}
        {jutsu.length > 0 && (
          <Section title={`Jutsu (${jutsu.length})`}>
            <View style={styles.jutsuList}>
              {jutsu.map((j, i) => (
                <View key={i} style={styles.jutsuItem}>
                  <Text style={styles.jutsuDot}>✦</Text>
                  <Text style={styles.jutsuText}>{j}</Text>
                </View>
              ))}
            </View>
          </Section>
        )}

        {/* ── Família ── */}
        {Object.keys(family).length > 0 && (
          <Section title="Família">
            {Object.entries(family).map(([rel, name]) => (
              <InfoRow key={rel} label={rel} value={name} />
            ))}
          </Section>
        )}

        {/* ── Traços únicos ── */}
        {uniqueTraits.length > 0 && (
          <Section title="Traços Únicos">
            {uniqueTraits.map((t, i) => (
              <View key={i} style={styles.traitItem}>
                <Text style={styles.traitDot}>◈</Text>
                <Text style={styles.traitText}>{t}</Text>
              </View>
            ))}
          </Section>
        )}

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-componentes ──────────────────────────────

function Section({ title, children }) {
  return (
    <View style={sectionStyles.container}>
      <Text style={sectionStyles.title}>{title}</Text>
      {children}
    </View>
  );
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <View style={infoStyles.row}>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={infoStyles.value} numberOfLines={3}>{String(value)}</Text>
    </View>
  );
}

// ── Styles ───────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    padding: spacing.md,
  },
  loadingCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  imageWrapper: {
    width: width * 0.55,
    height: width * 0.55,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#2A2A2A',
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '85%',
    height: '85%',
  },
  noImage: {
    fontSize: 64,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  rankBadge: {
    marginTop: spacing.xs,
    backgroundColor: colors.primary + '22',
    borderColor: colors.primary + '55',
    borderWidth: 0.5,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  jutsuList: {
    gap: 6,
  },
  jutsuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  jutsuDot: {
    fontSize: 10,
    color: colors.primary,
    marginTop: 3,
  },
  jutsuText: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
  },
  traitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  traitDot: {
    fontSize: 10,
    color: colors.accent,
    marginTop: 3,
  },
  traitText: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 19,
  },
});

const sectionStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 0.5,
    borderColor: '#2A2A2A',
    gap: spacing.sm,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#222',
    gap: spacing.sm,
  },
  label: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
    flexShrink: 0,
    maxWidth: '40%',
  },
  value: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
});
