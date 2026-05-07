import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../styles/theme';

// ─────────────────────────────────────────────
//  SearchBar
//  Props:
//    onSearch   {function(string)} - chamado ao digitar (com debounce)
//    placeholder {string}
// ─────────────────────────────────────────────

const DEBOUNCE_MS = 400;

export default function SearchBar({ onSearch, placeholder = 'Buscar personagem...' }) {
  const [value, setValue] = useState('');
  const timerRef = useRef(null);

  const handleChange = (text) => {
    setValue(text);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(text);
    }, DEBOUNCE_MS);
  };

  const handleClear = () => {
    setValue('');
    clearTimeout(timerRef.current);
    onSearch('');
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="never"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} hitSlop={8} style={styles.clearBtn}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 0.5,
    borderColor: '#333',
  },
  icon: {
    fontSize: 14,
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    height: 32,
    padding: 0,
  },
  clearBtn: {
    padding: 4,
  },
  clearText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
