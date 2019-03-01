const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  plugins: [
    new (class CustomPlugin {
      _processModules(modules, context) {
        modules.forEach(module => {
          module.id = path
            .relative(module.context, module.resource)
            .replace(/\\/g, '/')
        })
      }

      apply(compiler) {
        const context = compiler.options.context
        compiler.hooks.compilation.tap('CustomPlugin', compilation => {
          compilation.hooks.beforeModuleIds.tap('CustomPlugin', modules => this._processModules(modules, context))
        })
      }
    })()
    
  ]
}
