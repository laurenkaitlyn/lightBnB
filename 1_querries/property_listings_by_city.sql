SELECT properties.id as property_id, properties.title as title, properties.cost_per_night as cost_per_night, AVG(property_reviews.rating) as avg_rating
FROM properties
LEFT JOIN property_reviews ON properties.id = property_id
WHERE properties.city LIKE '%ancouv%'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER BY properties.cost_per_night
LIMIT 10;

