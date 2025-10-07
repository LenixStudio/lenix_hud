const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  mode: 'production',
  entry: {
    script: './web/script.js',
    client: './main.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // Set to true to remove console.logs
            dead_code: true,
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            keep_fargs: false,
            hoist_vars: true,
            if_return: true,
            join_vars: true,
            side_effects: true,
          },
          mangle: {
            toplevel: true,
            eval: true,
            keep_fnames: false,
          },
          output: {
            comments: false,
            beautify: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new JavaScriptObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayEncoding: ['rc4'],
      stringArrayThreshold: 0.75,
      splitStrings: true,
      splitStringsChunkLength: 10,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      identifierNamesGenerator: 'hexadecimal',
      renameGlobals: false,
      selfDefending: true,
      compact: true,
      unicodeEscapeSequence: false,
    }, [])
  ],
  target: 'node',
};