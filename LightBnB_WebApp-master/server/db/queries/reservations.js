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
  JOIN property_reviews ON reservations.id=reservation_id
  JOIN properties ON property_reviews.property_id=properties.id
  WHERE reservations.guest_id = $1
  AND end_date < now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY start_date ASC
  LIMIT $2;
  `;
  const values = [guest_id, limit];
  return pool.query(query, values)
    .then((res) => res.rows)
    .catch(err => console.error('query error', err.stack));
}
exports.getAllReservations = getAllReservations;