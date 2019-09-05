module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  extends: ['react-app', 'airbnb', 'prettier', 'prettier/react'],
  plugins: ['import', 'jsx-a11y', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-one-expression-per-line': 'off',
  },
};
