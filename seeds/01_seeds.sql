INSERT INTO users (name, email, password) VALUES
  ('Eva Stanley','sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Louisa Meyer','jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Dominic Parks','victoriablackwell@outlook.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Sue Luna','jasonvincent@gmx.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,
  cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1,'Walmart','description','https://i.imgur.com/BTNIDBR.gif','https://i.imgur.com/BTNIDBR.gif',1,1000,2,1,'Canada','Fake St','Funville', 'NA', '404 404', TRUE),
  (1,'McDonalds','description','https://i.imgur.com/BTNIDBR.gif','https://i.imgur.com/BTNIDBR.gif',20,12,2,3,'Grenada','??? St','Fatville', 'HA', '420 420', TRUE),
  (2,'Ocean View','description','https://i.imgur.com/BTNIDBR.gif','https://i.imgur.com/BTNIDBR.gif',200000,1,2,2,'USA','Coconut St','Volcano', 'Hawaii', '123456', FALSE),
  (4,'Abandoned Warehouse','description','https://i.imgur.com/BTNIDBR.gif','https://i.imgur.com/BTNIDBR.gif',9999,20,1,4,'Canada','1030 Spooky St','Ghost City', 'BC', 'FR8 NM8', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES
  ('1775-12-24','3000-01-01',4,3),
  ('1998-12-24','2021-01-01',2,1),
  ('2020-12-24','2021-01-01',3,4),
  ('2020-10-31','2020-11-01',1,4);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES
  (3,4,1,1,'message'),
  (1,2,2,5,'message'),
  (4,1,4,3,'message');