import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ─────────────────────────────────────────────
//  useFavorites
//  Persiste IDs de personagens favoritos
//  via AsyncStorage
// ─────────────────────────────────────────────

const STORAGE_KEY = '@naruto_mvp:favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);   // Array de objetos { id, name, images }
  const [loading, setLoading]     = useState(true);

  // ── Carrega do storage ao montar ─────────────
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setFavorites(JSON.parse(stored));
      } catch (e) {
        console.warn('[Favorites] Falha ao carregar:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Salva no storage sempre que muda ─────────
  const persist = useCallback(async (list) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('[Favorites] Falha ao salvar:', e);
    }
  }, []);

  // ── Verifica se é favorito ───────────────────
  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  );

  // ── Adiciona ou remove ───────────────────────
  const toggleFavorite = useCallback(
    async (character) => {
      setFavorites((prev) => {
        const exists = prev.some((f) => f.id === character.id);
        const next = exists
          ? prev.filter((f) => f.id !== character.id)
          : [...prev, { id: character.id, name: character.name, images: character.images }];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  // ── Remove todos ─────────────────────────────
  const clearFavorites = useCallback(async () => {
    setFavorites([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return { favorites, loading, isFavorite, toggleFavorite, clearFavorites };
}
