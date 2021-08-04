module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{json,ico,html,png,txt,js,css,gif,svg}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'build/service-worker.js',
};
