import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // Configuration de base
  js.configs.recommended,

  // Configuration pour tous les fichiers JS/TS/JSX/TSX
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // React Router v7 spécifique
      'react/react-in-jsx-scope': 'off', // React 17+ n'a plus besoin d'importer React
      'react/jsx-uses-react': 'off',
      'react/no-unescaped-entities': 'warn',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Général
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'off', // TypeScript gère ça mieux
      'no-empty-pattern': 'warn',
    },
  },

  // Désactive les règles ESLint qui entrent en conflit avec Prettier
  prettierConfig,

  // Fichiers à ignorer
  {
    ignores: [
      'dist/**',
      'build/**',
      '.react-router/**',
      'node_modules/**',
      '*.min.js',
      '*.min.css',
      'vite.config.ts',
      'react-router.config.ts',
      'eslint.config.js',
    ],
  },
];
