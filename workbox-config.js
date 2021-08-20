module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,png,js,css,txt,svg,woff,woff2}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'build/service-worker.js'
};