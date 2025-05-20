const {Pool} = require('pg')
require('dotenv').config()
const pool = new Pool({
    connectionString: process.env.DB_CON_STR,
    ssl : { rejectUnauthorized: false }
})

module.exports = pool
