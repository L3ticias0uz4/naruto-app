import axios from 'axios';

// ─────────────────────────────────────────────
//  Instância base do Axios para a NarutoDB API
//  Docs: https://api.narutodb.xyz
// ─────────────────────────────────────────────

const api = axios.create({
  baseURL: 'https://api.narutodb.xyz',
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de request — log em desenvolvimento
api.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response — normaliza erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Erro desconhecido';
    if (__DEV__) {
      console.error(`[API ERROR] ${message}`);
    }
    return Promise.reject(new Error(message));
  }
);

export default api;
