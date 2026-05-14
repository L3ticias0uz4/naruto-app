import { useState, useEffect, useCallback } from 'react';
import { fetchCharacters, searchCharacterByName } from '../services/narutoService';

// ─────────────────────────────────────────────
//  useCharacters
//  Gerencia listagem paginada + busca por nome
// ─────────────────────────────────────────────

const PAGE_SIZE = 20;

export function useCharacters() {
  const [characters, setCharacters]     = useState([]);
  const [loading, setLoading]           = useState(false);
  const [loadingMore, setLoadingMore]   = useState(false);
  const [error, setError]               = useState(null);
  const [page, setPage]                 = useState(1);
  const [hasMore, setHasMore]           = useState(true);
  const [searchQuery, setSearchQuery]   = useState('');
  const [isSearching, setIsSearching]   = useState(false);

  // ── Carrega primeira página ─────────────────
  const loadInitial = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacters(1, PAGE_SIZE);
      setCharacters(data.data || []);
      setPage(1);
      setHasMore((data.data || []).length === PAGE_SIZE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Carrega mais (paginação) ─────────────────
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || isSearching) return;
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await fetchCharacters(nextPage, PAGE_SIZE);
      const newItems = data.data || [];
      setCharacters((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setHasMore(newItems.length === PAGE_SIZE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore, isSearching]);

  // ── Busca por nome ───────────────────────────
  const search = useCallback(async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setIsSearching(false);
      loadInitial();
      return;
    }
    try {
      setIsSearching(true);
      setLoading(true);
      setError(null);
      const data = await searchCharacterByName(query.trim());
      setCharacters(data.data || []);
      setHasMore(false);
    } catch (err) {
      setError(err.message);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, [loadInitial]);

  // ── Retry ────────────────────────────────────
  const retry = useCallback(() => {
    loadInitial();
  }, [loadInitial]);

  // Carrega ao montar
  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return {
    characters,
    loading,
    loadingMore,
    error,
    hasMore,
    searchQuery,
    isSearching,
    loadMore,
    search,
    retry,
  };
}
