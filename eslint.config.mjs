import typescriptESLintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptESLintParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';

const config = [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  {
    languageOptions: {
      parser: typescriptESLintParser
    },
    plugins: {
      '@ts-eslint': typescriptESLintPlugin,
      '@stylistic/ts': stylistic
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
