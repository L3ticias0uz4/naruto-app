# 🍃 NarutoMVP

> MVP de aplicativo mobile moderno consumindo a [NarutoDB API](https://api.narutodb.xyz), desenvolvido com **React Native + Expo**.

![React Native](https://img.shields.io/badge/React%20Native-0.74-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-SDK%2051-black?logo=expo)
![NarutoDB](https://img.shields.io/badge/NarutoDB%20API-v1-orange)
![Licença](https://img.shields.io/badge/licença-MIT-green)

---

## 📱 Funcionalidades

| # | Requisito | Descrição | Status |
|---|---|---|---|
| RF01 | Listagem | Personagens em grid 2×2 com paginação (load more) | ✅ |
| RF02 | Busca | Busca por nome com debounce de 400ms | ✅ |
| RF03 | Detalhes | Jutsu, naturezas de chakra, família, traços únicos, debut | ✅ |
| RF04 | Favoritos | Favoritar/desfavoritar com persistência AsyncStorage | ✅ |
| RNF01 | Loading | ActivityIndicator em toda chamada de API | ✅ |
| RNF02 | Erros | Tratamento de falha de rede com botão "Tentar novamente" | ✅ |
| RNF03 | SafeArea | SafeAreaView em todas as telas | ✅ |
| RNF04 | Persistência | Favoritos salvos localmente via AsyncStorage | ✅ |
| RNF05 | Responsivo | Layout adaptativo retrato/paisagem | ✅ |

---

## 🚀 Como rodar do zero

### Pré-requisitos

- **Node.js 18+** — [nodejs.org](https://nodejs.org)
- **npm** ou **yarn**
- **Android Studio** com emulador configurado **ou** app **Expo Go** no celular

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/naruto-mvp.git
cd naruto-mvp

# 2. Instale as dependências
npm install

# 3. Inicie o servidor Expo
npx expo start

# ── Opções após iniciar ──────────────────────────────
# Pressione [a]  → abre no emulador Android (Android Studio aberto)
# Pressione [i]  → abre no simulador iOS (macOS + Xcode)
# Escaneie o QR  → abre no dispositivo físico via Expo Go
```

### Testar no emulador Android

1. Abra o **Android Studio**
2. Crie/inicie um dispositivo virtual (AVD): `Tools → Device Manager → Play ▶`
3. No terminal do Expo, pressione **`a`**

---

## 🗂️ Estrutura de Pastas

A estrutura segue os princípios de **Clean Architecture simplificada**, separando responsabilidades em camadas:

```
naruto-mvp/
├── App.js                    # Entry point — SafeAreaProvider + Navigator
├── app.json                  # Configurações Expo
├── package.json
│
└── src/
    ├── assets/               # Imagens, ícones e fontes locais
    │   └── (ícones do app)
    │
    ├── components/           # Componentes reutilizáveis e desacoplados
    │   ├── CharacterCard.js  # Card de personagem (grid da Home)
    │   ├── Header.js         # Cabeçalho padronizado (todas as telas)
    │   ├── SearchBar.js      # Input de busca com debounce
    │   ├── Loading.js        # ActivityIndicator com mensagem temática
    │   ├── ErrorView.js      # Tela de erro com botão retry
    │   ├── TypeBadge.js      # Chip colorido de natureza de chakra
    │   └── StatBar.js        # Barra de progresso para stats
    │
    ├── services/             # Comunicação com APIs externas
    │   ├── api.js            # Instância base do Axios (interceptors, timeout)
    │   └── narutoService.js  # Funções de chamada à NarutoDB API
    │
    ├── screens/              # Telas principais da aplicação
    │   ├── HomeScreen.js     # Lista de personagens + busca
    │   ├── DetailScreen.js   # Detalhes completos do personagem
    │   └── FavoritesScreen.js# Personagens favoritados
    │
    ├── styles/               # Design system e estilos globais
    │   ├── theme.js          # Cores, fontes, espaçamentos, mapeamentos
    │   └── globalStyles.js   # StyleSheet compartilhado entre telas
    │
    ├── routes/               # Configuração de navegação
    │   ├── AppNavigator.js   # Stack Navigator raiz
    │   └── TabNavigator.js   # Bottom Tab (Home ↔ Favoritos)
    │
    └── hooks/                # Custom hooks (lógica reutilizável)
        ├── useCharacters.js  # Paginação + busca de personagens
        └── useFavorites.js   # CRUD de favoritos + AsyncStorage
```

### Por que essa divisão importa?

| Pasta | Responsabilidade | Benefício |
|---|---|---|
| `services/` | Toda a lógica de rede fica aqui | Trocar a API não exige mudar nenhuma tela |
| `hooks/` | Lógica de estado separada da UI | Mesma lógica reutilizável em múltiplas telas |
| `components/` | UI sem regras de negócio | Componentes testáveis e substituíveis |
| `screens/` | Apenas composição e navegação | Telas limpas e fáceis de ler |
| `styles/` | Fonte única de verdade para design | Alterações visuais em um só lugar |

---

## 🎨 Style Guide

### Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#F97316` | Botões, destaques, ícones ativos |
| `background` | `#0D0D0D` | Fundo geral |
| `surface` | `#1A1A1A` | Cards e painéis |
| `textPrimary` | `#F5F5F5` | Texto principal |
| `textSecondary` | `#A0A0A0` | Texto secundário |
| `accent` | `#3B82F6` | Links e informações |

### Tipografia

| Estilo | Tamanho | Peso | Uso |
|---|---|---|---|
| Título H1 | 22px | 700 | Nome do personagem |
| Subtítulo | 16px | 600 | Cabeçalhos de seção |
| Corpo | 14px | 400 | Texto informativo |
| Caption | 12px | 500 | Badges e labels |

---

## 🌐 API Utilizada

**NarutoDB API** — [api.narutodb.xyz](https://api.narutodb.xyz)

| Endpoint | Uso |
|---|---|
| `GET /character?page=1&limit=20` | Listagem paginada |
| `GET /character/search?name=naruto` | Busca por nome |
| `GET /character/:id` | Detalhes do personagem |

---

## 📦 Dependências Principais

```json
{
  "@react-native-async-storage/async-storage": "persistência de favoritos",
  "@react-navigation/bottom-tabs":             "abas inferiores",
  "@react-navigation/native-stack":            "navegação entre telas",
  "axios":                                     "requisições HTTP",
  "expo":                                      "plataforma de desenvolvimento",
  "react-native-safe-area-context":            "área segura em todos os dispositivos"
}
```

---

## 📝 Commits Semânticos

Este projeto adota a convenção [Conventional Commits](https://www.conventionalcommits.org):

```
feat: adiciona tela de favoritos
fix: corrige paginação ao buscar por nome
style: ajusta cores do header
refactor: extrai lógica para hook useCharacters
docs: atualiza README com instruções de setup
chore: adiciona babel.config.js
```

---

## 👤 Autor

Desenvolvido como MVP de 8 horas para avaliação técnica de React Native.

---

## 📄 Licença

MIT © 2024
