import api from './api';
import { mockCharacters, searchMock } from './mockData';

// ─────────────────────────────────────────────
//  NarutoService — chamadas de dados à API
//  Base URL: https://api.narutodb.xyz
//  Fallback: mockData local quando API indisponível
// ─────────────────────────────────────────────

const PAGE_SIZE = 20;

/**
 * Lista personagens com paginação.
 */
export const fetchCharacters = async (page = 1, limit = PAGE_SIZE) => {
  try {
    const { data } = await api.get('/character', {
      params: { page, limit },
    });
    return data;
  } catch {
    const start = (page - 1) * limit;
    const end = start + limit;
    const sliced = mockCharacters.slice(start, end);
    return { data: sliced, currentPage: page, pageSize: limit, total: mockCharacters.length };
  }
};

/**
 * Busca personagens por nome.
 */
export const searchCharacterByName = async (name) => {
  try {
    const { data } = await api.get('/character/search', {
      params: { name },
    });
    return data;
  } catch {
    const results = searchMock(name);
    return { data: results, total: results.length };
  }
};

/**
 * Busca personagem por ID.
 */
export const fetchCharacterById = async (id) => {
  try {
    const { data } = await api.get(`/character/${id}`);
    return data;
  } catch {
    return mockCharacters.find((c) => c.id === Number(id)) || null;
  }
};

export const fetchClans = async (page = 1, limit = 20) => {
  const { data } = await api.get('/clan', { params: { page, limit } });
  return data;
};

export const fetchVillages = async (page = 1, limit = 20) => {
  const { data } = await api.get('/village', { params: { page, limit } });
  return data;
};

export const fetchKekkeiGenkai = async (page = 1, limit = 20) => {
  const { data } = await api.get('/kekkei-genkai', { params: { page, limit } });
  return data;
};
