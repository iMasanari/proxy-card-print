export default {
  locales: ['ja', 'en', 'zh-Hans'],
  sort: true,
  createOldCatalogs: false,
  defaultNamespace:'translation',
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  input: 'src/**/*.tsx',
}
