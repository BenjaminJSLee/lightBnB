 const pool = require('../index');
 
 /**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = `
  SELECT * FROM users WHERE email = $1;
  `;
  const values = [ email ];
  return pool.query(query,values)
    .then((res) => {
      if( res.rows.length === 0 ) return null;
      return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = `
  SELECT * FROM users WHERE id = $1;
  `;
  const values = [ id ];
  return pool.query(query, values)
    .then((res) => {
      if( res.rows.length === 0 ) return null;
      return res.rows[0];
    })
    .catch(err => console.error('query error', err.stack));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const values = [user.name, user.email, user.password];
  return pool.query(query, values)
    .then((res) => res.rows)
    .catch(err => console.error('query error', err.stack));
}
exports.addUser = addUser;