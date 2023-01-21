module.exports = {
  locales: ['ja', 'en'],
  sort: true,
  createOldCatalogs: false,
  defaultNamespace:'translation',
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: 'src/**/*.tsx',
}
