module.exports = {
  defaultNamespace: 'translation',
  lexers: {
    js: ['JsxLexer'],
    default: ['JavascriptLexer'],
  },
  locales: ['en', 'ua'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.js'],
  createOldCatalogs: false,
  keepRemoved: false,
  keySeparator: false,
}