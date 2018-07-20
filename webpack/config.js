const path = require('path')

const conf = {
    SRC_DIR: 'source',
    DIST_DIR: 'dist',
    ASSETS_DIR: 'source',
    DEV_ENTRY_JS_FILE: 'main',
    INDEX_HTML_FILE: 'index.html',
}

root = process.cwd()

module.exports = {
    ROOT: root,
    ASSETS: path.resolve(root, conf.ASSETS_DIR),
    DIST: path.resolve(root, conf.DIST_DIR),
    SRC: path.resolve(root, conf.SRC_DIR),
    DEV_ENTRY_JS_FILE: conf.DEV_ENTRY_JS_FILE,
    INDEX_HTML_FILE: conf.INDEX_HTML_FILE,
}
