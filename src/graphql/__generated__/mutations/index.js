
const fs = require('fs');
const path = require('path');

module.exports.createUser = fs.readFileSync(path.join(__dirname, 'createUser.gql'), 'utf8');
module.exports.login = fs.readFileSync(path.join(__dirname, 'login.gql'), 'utf8');
module.exports.productCreate = fs.readFileSync(path.join(__dirname, 'productCreate.gql'), 'utf8');
