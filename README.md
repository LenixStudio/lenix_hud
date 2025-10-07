npm init -y
npm install --save-dev webpack webpack-cli terser-webpack-plugin webpack-obfuscator
npm run build
```js // webpack.config.js
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    mode: 'production',
    entry: {
        client: [
          '',
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: false,
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
```

```json package.json
{
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "watch": "webpack --watch --config webpack.config.js"
  }
}
```