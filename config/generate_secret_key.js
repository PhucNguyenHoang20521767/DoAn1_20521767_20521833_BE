const crypto = require("crypto");

const jwt_secret_key = crypto.randomBytes(32).toString('hex')
const jwt_secret_key_refresh = crypto.randomBytes(32).toString('hex')

console.table({jwt_secret_key, jwt_secret_key_refresh})