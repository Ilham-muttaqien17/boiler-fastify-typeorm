module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Limits what types can be used in commit messages
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test', 'hotfix', 'deploy']
    ],

    // Ensures that the type (e.g., fix, hotfix) is in lowercase
    'type-case': [2, 'always', 'lower-case'],

    // Enforces lowercase scope (the part in parentheses)
    'scope-case': [2, 'always', 'lower-case'],

    // Controls how the message after : should be lowercase
    'subject-case': [2, 'always', 'lower-case'],

    // Ensures the commit message after : is not empty
    'subject-empty': [2, 'never'],

    // Ensures that the entire commit header (type + scope + message) is not too long.
    // Limit the commit header length to 100 character
    'header-max-length': [2, 'always', 100]
  }
};
