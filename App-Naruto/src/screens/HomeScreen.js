import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';
import Loading from '../components/Loading';
import ErrorView from '../components/ErrorView';
import { useCharacters } from '../hooks/useCharacters';
import { useFavorites } from '../hooks/useFavorites';
import { colors, spacing } from '../styles/theme';

// ─────────────────────────────────────────────
//  HomeScreen — Listagem de Personagens
// ─────────────────────────────────────────────

export default function HomeScreen({ navigation }) {
  const {
    characters,
    loading,
    loadingMore,
    error,
    loadMore,
    search,
    retry,
    isSearching,
  } = useCharacters();

  const { isFavorite, toggleFavorite } = useFavorites();

  // ── Navega para detalhes ─────────────────────
  const handlePress = useCallback(
    (character) => {
      navigation.navigate('Detail', { characterId: character.id, characterName: character.name });
    },
    [navigation]
  );

  // ── Renderiza item da FlatList ───────────────
  const renderItem = useCallback(
    ({ item }) => (
      <CharacterCard
        character={item}
        onPress={() => handlePress(item)}
        onFavorite={() => toggleFavorite(item)}
        isFavorite={isFavorite(item.id)}
      />
    ),
    [handlePress, toggleFavorite, isFavorite]
  );

  // ── Footer da lista (loading more) ──────────
  const renderFooter = () => {
    if (!loadingMore) return <View style={{ height: spacing.xl }} />;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.footerText}>Carregando mais ninjas...</Text>
      </View>
    );
  };

  // ── Lista vazia ──────────────────────────────
  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🥷</Text>
        <Text style={styles.emptyText}>Nenhum personagem encontrado.</Text>
      </View>
    );
  };

  // ── Key extractor ────────────────────────────
  const keyExtractor = useCallback((item) => String(item.id), []);

  // ── Estados de tela inteira ──────────────────
  if (loading && characters.length === 0) {
    return <Loading message="Convocando o exército ninja..." />;
  }

  if (error && characters.length === 0) {
    return <ErrorView message={error} onRetry={retry} />;
  }

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
      <Header
        title="NarutoMVP"
        subtitle={`${characters.length} ninjas encontrados`}
      />

      <SearchBar onSearch={search} placeholder="Buscar ninja por nome..." />

      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        // Performance
        removeClippedSubviews
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        windowSize={5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  footerLoader: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    gap: spacing.xs,
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  emptyContainer: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
