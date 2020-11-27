const pool = require('../index');

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let query = `
  SELECT properties.*, AVG(rating) AS average_rating
  FROM properties
  LEFT OUTER JOIN property_reviews ON properties.id=property_id
  `;
  const values = [];
  if (options.city || options.city === 0) {
    values.push(`%${options.city}%`);
    query = `${query}
    WHERE city LIKE $${values.length}`;
  }
  if (options.owner_id || options.owner_id === 0) {
    values.push(options.owner_id);
    query = `${query}
    ${values.length > 1 ? 'AND' : 'WHERE'} owner_id = $${values.length}`;
  }
  if (options.minimum_price_per_night || options.minimum_price_per_night === 0) {
    values.push(options.minimum_price_per_night);
    query = `${query}
    ${values.length > 1 ? 'AND' : 'WHERE'} cost_per_night >= $${values.length}`;
  }
  if (options.maximum_price_per_night || options.maximum_price_per_night === 0) {
    values.push(options.maximum_price_per_night);
    query = `${query}
    ${values.length > 1 ? 'AND' : 'WHERE'} cost_per_night <= $${values.length}`;
  }
  query = `${query}
  GROUP BY properties.id`;
  if (options.minimum_rating || options.minimum_rating === 0) {
    values.push(options.minimum_rating);
    query = `${query}
    HAVING AVG(rating) >= $${values.length}`;
  }
  values.push(limit);
  query = `${query}
  ORDER BY cost_per_night ASC
  LIMIT $${values.length};`;
  return pool.query(query, values)
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let query = `INSERT INTO properties`;
  const values = [];
  let fields = `(`;
  let queryValues = `VALUES (`;
  for (const key in property) { // assumes that all keys in the property object are valid for the property table
    fields = `${fields} ${key},`;
    values.push(property[key]);
    queryValues = `${queryValues} $${values.length},`;
  }
  query = `${query} ${fields.slice(0,-1)})
  ${queryValues.slice(0,-1)})
  RETURNING *;`;

  return pool.query(query, values)
    .then((res) => res.rows[0])
    .catch(err => console.error('query error', err.stack));
}
exports.addProperty = addProperty;