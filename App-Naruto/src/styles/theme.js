// ─────────────────────────────────────────────
//  NarutoMVP · Style Guide / Theme
//  Paleta inspirada em Konoha e chakra laranja
// ─────────────────────────────────────────────

export const colors = {
  // Backgrounds
  background:    '#0D0D0D',  // preto fundo geral
  surface:       '#1A1A1A',  // cards e superfícies
  surfaceLight:  '#252525',  // inputs e bordas
  overlay:       '#111111',  // header / bottom bar

  // Primária — Laranja Naruto
  primary:       '#F97316',  // botões, destaques
  primaryDark:   '#C2570E',  // pressed / sombra
  primaryLight:  '#FED7AA',  // chips suaves

  // Acento — Azul Sasuke
  accent:        '#3B82F6',  // links, info
  accentDark:    '#1D4ED8',

  // Texto
  textPrimary:   '#F5F5F5',
  textSecondary: '#A0A0A0',
  textMuted:     '#606060',

  // Status
  success:       '#22C55E',
  danger:        '#EF4444',
  warning:       '#EAB308',

  // Ranks / Aldeias (chips de natureza de chakra)
  fire:          '#EF4444',
  water:         '#3B82F6',
  wind:          '#22D3EE',
  earth:         '#A16207',
  lightning:     '#EAB308',
  wood:          '#16A34A',
  ice:           '#BAE6FD',
  sand:          '#D97706',
  darkness:      '#7C3AED',
};

export const fonts = {
  regular:   '14px',  // body text
  small:     '12px',  // captions / badges
  medium:    '16px',  // subtítulos
  large:     '20px',  // títulos de seção
  xlarge:    '24px',  // título da tela
  bold:      '700',
  semibold:  '600',
  normal:    '400',
};

export const spacing = {
  xs:   4,
  sm:   8,
  md:   16,
  lg:   24,
  xl:   32,
  xxl:  48,
};

export const borderRadius = {
  sm:   6,
  md:   10,
  lg:   16,
  full: 9999,
};

export const shadows = {
  card: {
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
};

// Mapeamento de natureza de chakra → cor
export const natureColors = {
  'Fire Release':       colors.fire,
  'Water Release':      colors.water,
  'Wind Release':       colors.wind,
  'Earth Release':      colors.earth,
  'Lightning Release':  colors.lightning,
  'Wood Release':       colors.wood,
  'Ice Release':        colors.ice,
  'Sand Release':       colors.sand,
  'Yin Release':        colors.darkness,
  'Yang Release':       '#A78BFA',
  'Yin–Yang Release':   '#6D28D9',
};

// Mapeamento de aldeias → emoji bandeira
export const villageEmojis = {
  'Konohagakure':   '🍃',
  'Sunagakure':     '🌵',
  'Kirigakure':     '🌊',
  'Kumogakure':     '⚡',
  'Iwagakure':      '🪨',
  'Otogakure':      '🎵',
  'Akatsuki':       '🌙',
};
