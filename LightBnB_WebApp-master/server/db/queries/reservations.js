const pool = require('../index');

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const query = `
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
  FROM reservations 
  JOIN properties ON reservations.property_id=properties.id
  LEFT OUTER JOIN property_reviews ON reservations.id=reservation_id
  WHERE reservations.guest_id = $1
  AND end_date < now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date ASC
  LIMIT $2;
  `;
  console.log(guest_id);
  const values = [guest_id, limit];
  return pool.query(query, values)
    .then((res) => res.rows)
    .catch(err => console.error('query error', err.stack));
}
exports.getAllReservations = getAllReservations;

const addReservation = function(opts) {
  let query = `INSERT INTO reservations`;
  const values = [];
  let fields = `(`;
  let queryValues = `VALUES (`;
  for (const key in opts) { // assumes that all keys in the property object are valid for the property table
    fields = `${fields} ${key},`;
    values.push(opts[key]);
    queryValues = `${queryValues} $${values.length},`;
  }
  query = `${query} ${fields.slice(0,-1)})
  ${queryValues.slice(0,-1)})
  RETURNING *;`;

  return pool.query(query, values)
    .then((res) => res.rows[0])
    .catch(err => console.error('query error', err.stack));
};

exports.addReservation = addReservation;