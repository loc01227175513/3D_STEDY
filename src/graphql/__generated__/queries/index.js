
const fs = require('fs');
const path = require('path');

module.exports.getProducts = fs.readFileSync(path.join(__dirname, 'getProducts.gql'), 'utf8');
module.exports.getUserById = fs.readFileSync(path.join(__dirname, 'getUserById.gql'), 'utf8');
module.exports.getUsers = fs.readFileSync(path.join(__dirname, 'getUsers.gql'), 'utf8');
