-- 1. Create database HR;
create database HR;

-- 2. Create table employee;
use HR;

-- 2. Create table employee;
drop table if exists employee;
create table employee (
  id int not null auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  title varchar(255) not null,
  salary int not null,
  department varchar(255) not null,
  start_date date not null,
  location_id int,
  primary key(id)
);


show tables;
describe locations;
describe employee;

--3. Create table location;
drop table if exists locations;
create table locations (
  id int,
  country varchar(255),
  city varchar(255),
  street varchar(255),
  postal_code varchar(255),
  primary key(id),
  foreign key (id)
    references employee(id)
);




-- 4. Insert 10-20 rows in each table with relevant fields. (Make sure that you have relevant relations)
-- Relations: Employee has many locations
insert into employee (first_name, last_name, title, salary, department, start_date, location_id) 
values 
  ('James', 'Tomsson', 'Sales Manager', 320000, 'Sales', '1999-12-31', 1), 
  ('Joan', 'Johnsson', 'PR Manager', 400000, 'PR', '2020-12-25', 2), 
  ('Simonna', 'Simonsson', 'Web developer', 549345, 'Dev', '2020-11-25', 3), 
  ('Bim', 'Timsson', 'DevOps', 400000, 'Dev', '2020-10-25'), 
  ('Bola', 'Lolasson', 'Art Director', 234567, 'Art', '2022-01-11', 4), 
  ('Haga', 'Doe', 'Manager', 123456, 'Management', '2020-11-11', 5), 
  ('Jennifer', 'Cat', 'Sound Producer', 543216, 'Art', '2020-09-10', 6), 
  ('Claudia', 'Simpson', 'Son of Homer', 543216, 'Simpsons', '1999-02-11', 7), 
  ('Lissa', 'Simpson', 'Daughter of Homer', 654765, 'Simpsons', '1999-02-11', 8), 
  ('Ekow', 'Sampson', 'Father', 333333, 'Simpsons', '1999-02-11', 9),
  ('Beatrice', 'Nobody Knows', 'Son', 333333, 'Family Guy', '2000-02-03', 10)
;

describe employee;
select * from employee;

insert into locations(country, city, street, postal_code)
values
  ('Poland', 'Krakow', 'Wlodecka 16', '23456' ),
  ('Germany', 'Berlin', 'Vasagatan 15', '63567'),
  ('Sweden', 'Gothenburg', 'Kristiansgatan 2', '43555'),
  ('Denmark', 'Cophenhagan', 'Lillatorget 1', '33344'),
  ('Korea', 'Kiruna', 'Storgatan 6', '66554'),
  ('Wonderland', 'Wondercity', 'Wonder street 888', '88888'),
  ('Simon Country', 'Simon City', 'Simon Street', '55555'),
  ('UK', 'Springfield', 'Unknown Street 13', '77777'),
  ('Austria', 'Springfield', 'Unknown Street 13', '77777'),
  ('Neitherland', 'Springfield', 'Unknown Street 13', '77777'),
  ('UK', 'London', 'Strange street 9', '88888')
;

describe locations;
select * from locations;
