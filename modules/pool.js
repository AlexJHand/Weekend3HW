// Require Pool to connect server to database
var Pool = require('pg').Pool;

// Set up our config to connect correctly to database
var config = {
    host: 'localhost',
    port: 5432,
    database: 'tasks',
    max: 20
}

// ourPool is an instance of Pool that knows our configuration
var ourPool = new Pool(config);

// Export ourPool
module.exports = ourPool;