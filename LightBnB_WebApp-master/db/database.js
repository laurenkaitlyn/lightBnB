const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');
const { query } = require("express");

const pool = new Pool({
  user: 'laurengreasley',
  host: 'localhost',
  database: 'lightbnb'
});




/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE users.email = $1
  `;

  return pool
    .query(queryString, [email])
    .then(result => result.rows[0])
    .catch(err => err.message);

};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1
  `;

  return pool
    .query(queryString, [id])
    .then(result => result.rows[0])
    .catch(err => err.message);
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const queryString = `
  INSERT INTO users (name, password, email)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  return pool
    .query(queryString, [user.name, user.password, user.email])
    .then(result => result.rows)
    .catch(err => err.message);
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
SELECT reservations.id, properties.thumbnail_photo_url, properties.title, properties.number_of_bedrooms, properties.number_of_bathrooms, properties.parking_spaces, reservations.start_date, reservations.end_date, avg(rating) as average_rating, properties.cost_per_night
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = $1
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT $2;
  `;

  return pool
    .query(queryString, [guest_id, limit])
    .then(result => result.rows)
    .catch(err => err.message);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, properties.thumbnail_photo_url, properties.title, properties.number_of_bedrooms, properties.number_of_bathrooms, properties.parking_spaces, avg(property_reviews.rating) as average_rating, properties.cost_per_night
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (queryString.includes('WHERE')) {
      queryString += `AND owner_id = $${queryParams.length}`;
    } else {
      queryString += `WHERE owner_id = $${queryParams.length}`;
    }
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {

    const minPrice = Number(options.minimum_price_per_night * 100);
    const maxPrice = Number(options.maximum_price_per_night * 100);

    queryParams.push(`${minPrice}`);
    queryParams.push(`${maxPrice}`);

    if (queryString.includes('WHERE')) {
      queryString += ` AND properties.cost_per_night >= $${queryParams.length - 1} AND properties.cost_per_night <= $${queryParams.length}`;
    } else {
      queryString += `WHERE properties.cost_per_night >= $${queryParams.length - 1} AND properties.cost_per_night <= $${queryParams.length}`;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);

    if (queryString.includes('WHERE')) {
      queryString += ` AND property_reviews.rating >= $${queryParams.length}`;
    } else {
      queryString += `WHERE property_reviews.rating >= $${queryParams.length}`;
    }
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;



  return pool
    .query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => err.message);
};

/**
 * Add a property to the database
 * @param {{owner_id: int, title: string, description: string, thumbnail_photo_url: string, cover_photo_url: string, cost_per_night: string, street: string, city: string, province: string, post_code: string, country: string, parking_spaces: int, number_of_bathrooms: int, number_of_bedrooms: int}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms,number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;

  const queryParams = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];

  return pool
    .query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => err.message);

};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
