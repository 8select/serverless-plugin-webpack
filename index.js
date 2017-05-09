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

        let jsonStats = stats.toJson()
        let stringStats = stats.toString({
          chunks: false,
          colors: true
        })
        console.log('[webpack:build]', stringStats)

        if (jsonStats.errors.length > 0) {
          reject('webpack failed')
        }

        if(jsonStats.warnings.length > 0) {
          reject('webpack failed')
        }

        resolve()
      })
    })
  }
}

module.exports = ServerlessPluginWebpack
