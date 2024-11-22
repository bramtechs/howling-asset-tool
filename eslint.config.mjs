import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import sonarjs from 'eslint-plugin-sonarjs';

export default {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
  ],
  plugins: {
    '@typescript-eslint': tseslint,
    sonarjs: sonarjs,
  },
  ignorePatterns: ['node_modules', 'dist', 'build', 'out'],
  globals: {
    ...globals.node,
  },
};
