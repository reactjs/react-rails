const { environment } = require('@rails/webpacker')

environment.config.set('output.filename', '[name].js')

module.exports = environment
