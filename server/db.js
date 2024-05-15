const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'GymDb',
    password: 'abbaS2003',
    port: 5432
});

module.exports = pool;
