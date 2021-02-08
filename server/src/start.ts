// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require('@babel/register')({
    presets: ['@babel/preset-env'],
})
require('@babel/polyfill')
require('dotenv').config()

// Import the rest of our application.
module.exports = require('./server.ts')

// Source: https://timonweb.com/javascript/how-to-enable-es6-imports-in-nodejs/
