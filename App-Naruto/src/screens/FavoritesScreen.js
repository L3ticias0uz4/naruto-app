import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { useFavorites } from '../hooks/useFavorites';
import Loading from '../components/Loading';
import { colors, spacing, borderRadius } from '../styles/theme';

// ─────────────────────────────────────────────
//  FavoritesScreen — Lista de Favoritos
// ─────────────────────────────────────────────

export default function FavoritesScreen({ navigation }) {
  const { favorites, loading, toggleFavorite, clearFavorites } = useFavorites();

  const handleClearAll = () => {
    Alert.alert(
      'Limpar Favoritos',
      'Deseja remover todos os personagens favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: clearFavorites },
      ]
    );
  };

  const handlePress = (item) => {
    navigation.navigate('Detail', { characterId: item.id, characterName: item.name });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handlePress(item)}
      activeOpacity={0.8}
    >
      {/* Avatar */}
      {item.images?.[0] ? (
        <Image source={{ uri: item.images[0] }} style={styles.avatar} resizeMode="contain" />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={{ fontSize: 24 }}>🥷</Text>
        </View>
      )}

      {/* Nome */}
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>

      {/* Botão remover */}
      <TouchableOpacity
        onPress={() => toggleFavorite(item)}
        hitSlop={8}
        style={styles.removeBtn}
        accessibilityLabel="Remover dos favoritos"
      >
        <Text style={styles.removeIcon}>❤️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) return <Loading message="Carregando favoritos..." />;

  const ClearButton = () =>
    favorites.length > 0 ? (
      <TouchableOpacity onPress={handleClearAll} hitSlop={8}>
        <Text style={styles.clearBtn}>Limpar</Text>
      </TouchableOpacity>
    ) : null;

  return (
    <SafeAreaView style={styles.screen} edges={['left', 'right', 'bottom']}>
      <Header
        title="Favoritos"
        subtitle={`${favorites.length} ninja${favorites.length !== 1 ? 's' : ''}`}
        rightIcon={<ClearButton />}
      />

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>Sem favoritos ainda</Text>
          <Text style={styles.emptyText}>
            Favorite personagens na tela principal para vê-los aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    gap: spacing.sm,
    borderWidth: 0.5,
    borderColor: '#2A2A2A',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    backgroundColor: '#1E1E1E',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  removeBtn: {
    padding: 4,
  },
  removeIcon: {
    fontSize: 18,
  },
  clearBtn: {
    fontSize: 13,
    color: colors.danger,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
