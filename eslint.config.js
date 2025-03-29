import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier'; // Add this

import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      prettier: pluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-runtime': 'off',
      'no-unused-vars': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'double'],
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
];
