INSERT INTO users 
(name, email, password)
VALUES 
('Lauren Greasley', 'l@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Will Scheffler', 'w@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dwight Shrute', 'd@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties 
(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES 
(1, 'Beach House', 'description', 'thumbnail photo', 'cover photo', 250, 1, 2, 2, 'Canada', 'Muskoka', 'Oak Street', 'ON', 'A1B 2C3', TRUE),
(1, 'Tiny Home', 'description', 'thumbnail photo', 'cover photo', 100, 1, 1, 1, 'Canada', 'Vancouver', 'Main Street', 'BC', '123 456', TRUE),
(3, 'Farm House', 'description', 'thumnail photo', 'cover photo', 300, 2, 0, 1, 'Canada', 'Paris', 'Farm lane', 'ON', '234 567', TRUE);


INSERT INTO reservations 
(start_date, end_date, property_id, guest_id) 
VALUES 
('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews 
(guest_id, property_id, reservation_id, rating, message) 
VALUES 
(3, 2, 5, 3, 'message'),
(2, 2, 2, 4, 'message'),
(3, 1, 3, 4, 'message');

