const properties = require('./db/queries/properties');
const reservations = require('./db/queries/reservations');
const users = require('./db/queries/users');

module.exports = {
  ...properties,
  ...reservations,
  ...users,
};
