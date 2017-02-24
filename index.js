'use strict'

const path = require('path')
const webpack = require('webpack')

class ServerlessPluginWebpack {
  constructor (serverless, options) {
    this.serverless = serverless
    this.options = options
    this.hooks = {
      'before:deploy:initialize': this.bundle.bind(this)
    }
  }

  bundle () {
    this.serverless.cli.log('Bundling service...')
    return new Promise((resolve, reject) => {
      const config = require(path.join(this.serverless.config.servicePath, 'webpack.config.js'))
      webpack(config, (error, stats) => {
        if (error) {
          reject(error)
        }
        resolve()
      })
    })
  }
}

module.exports = ServerlessPluginWebpack
