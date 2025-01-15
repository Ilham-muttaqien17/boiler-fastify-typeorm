import typescriptESLintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptESLintParser from '@typescript-eslint/parser';
import stylisticTs from '@stylistic/eslint-plugin-ts';

const config = [
  {
    languageOptions: {
      parser: typescriptESLintParser
    },
    plugins: {
      '@ts-eslint': typescriptESLintPlugin,
      '@stylistic/ts': stylisticTs
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'off',
      indent: ['off'],
      quotes: ['error', 'single'],
      '@stylistic/ts/comma-dangle': ['error', 'never'],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@ts-eslint/no-explicit-any': 'off',
      '@ts-eslint/no-unused-vars': 'error',
      '@ts-eslint/consistent-type-imports': 'error'
    },
    files: ['**/*.ts', '**/*.tsx']
  }
];

export default config;
