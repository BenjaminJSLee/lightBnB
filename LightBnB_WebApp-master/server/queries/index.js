const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
});

module.exports = {  // NOTE: cb is included here for posterity, cb's won't be used in this project
  query: (query, values, cb) => {
    return pool.query(query, values, cb);
  },
}