// Note: You must restart bin/webpack-watcher for changes to take effect

const merge = require('webpack-merge')
const sharedConfig = require('./shared.js')

module.exports = merge(sharedConfig, {})
