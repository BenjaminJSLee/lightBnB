SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
FROM reservations 
JOIN property_reviews ON reservations.id=reservation_id
JOIN properties ON property_reviews.property_id=properties.id
WHERE reservations.guest_id = 1
AND end_date < now()::date
GROUP BY reservations.id, properties.id
ORDER BY start_date ASC
LIMIT 10;
