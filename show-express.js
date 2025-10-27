const util = require('util');
const express = require('express');

console.log('typeof express ->', typeof express);
console.log('express.name ->', express.name);
console.log('Top-level own property names on express:\n', Object.getOwnPropertyNames(express).join(', '), '\n');

console.log('Does express have application prototype?', typeof express.application);
console.log('Sample properties on express.application:\n',
    Object.getOwnPropertyNames(express.application).slice(0,30).join(', '), '\n');

console.log('Does express have a request prototype?', typeof express.request);
console.log('Sample properties on express.application:\n',
    Object.getOwnPropertyNames(express.request).slice(0,30).join(', '), '\n');

console.log('Does express have a response prototype?', typeof express.response);
console.log('Sample properties on express.response:\n',
    Object.getOwnPropertyNames(express.response).slice(0,30).join(', '), '\n');

const app = express();
console.log('typeof app ->', typeof app);
console.log('app is callable (a request handler) ->', !!app.handle);
console.log('Some top-level app methods: \n', Object.getOwnPropertyNames(app).filter(n => typeof app[n] === 'function').slice(0,40).join(', '), '\n');

//Print a few things in readable format
console.log('express.ROuter ->', typeof express.Router);
console.log('express.json ->', typeof express.json);
console.log('express.urlencoded ->', typeof express.urlencoded);
console.log('express.static ->', typeof express.static);
console.log('express.raw ->', typeof express.raw);
console.log('express.text ->', typeof express.text);