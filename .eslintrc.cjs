module.exports = {
  extends: 'next',
  root: true,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
}
