import api from './api';

// ─────────────────────────────────────────────
//  NarutoService — chamadas de dados à API
//  Base URL: https://api.narutodb.xyz
// ─────────────────────────────────────────────

/**
 * Lista personagens com paginação.
 * @param {number} page  - página atual (default 1)
 * @param {number} limit - itens por página (default 20)
 * @returns {{ characters: Array, currentPage, pageSize, total }}
 */
export const fetchCharacters = async (page = 1, limit = 20) => {
  const { data } = await api.get('/character', {
    params: { page, limit },
  });
  return data;
};

/**
 * Busca personagens por nome.
 * @param {string} name - nome do personagem
 */
export const searchCharacterByName = async (name) => {
  const { data } = await api.get('/character/search', {
    params: { name },
  });
  return data;
};

/**
 * Busca personagem por ID.
 * @param {number|string} id
 */
export const fetchCharacterById = async (id) => {
  const { data } = await api.get(`/character/${id}`);
  return data;
};

/**
 * Lista clãs com paginação.
 */
export const fetchClans = async (page = 1, limit = 20) => {
  const { data } = await api.get('/clan', {
    params: { page, limit },
  });
  return data;
};

/**
 * Lista aldeias (villages) com paginação.
 */
export const fetchVillages = async (page = 1, limit = 20) => {
  const { data } = await api.get('/village', {
    params: { page, limit },
  });
  return data;
};

/**
 * Lista Kekkei Genkai com paginação.
 */
export const fetchKekkeiGenkai = async (page = 1, limit = 20) => {
  const { data } = await api.get('/kekkei-genkai', {
    params: { page, limit },
  });
  return data;
};
