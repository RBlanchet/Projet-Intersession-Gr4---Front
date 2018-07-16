const flexbugs = require('postcss-flexbugs-fixes')
const cssnext = require('postcss-cssnext')
const postcssReporter = require('postcss-reporter')

module.exports = {
    plugins: [
        cssnext,
        flexbugs,
        postcssReporter({
            clearMessages: true
        }),
    ]
}
