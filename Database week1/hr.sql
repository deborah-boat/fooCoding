-- 1. Create database HR;
create database HR;

-- 2. Create table employee;
use HR;

drop table if exists location;
create table location (
  location_id int not null auto_increment,
  city varchar(255),
  street varchar(255),
  postal_code varchar(255),
); 

show tables;
describe locations;
describe employee;

--3. Create table employee;
drop table if exists employee;
create table employee (
  employee_id int not null auto_increment,
  first_name varchar(255),
  last_name varchar(255),
  salary INT,
  -- constraints
  primary key(location_id),
  foreign key(employee_id)
    references employee(employee_id)
);


-- 4. Insert 10-20 rows in each table with relevant fields. (Make sure that you have relevant relations)
-- Relations: Employee has many locations
insert into employee (first_name, last_name, title, salary, department, start_date) 
values 
  ('James', 'Tomsson', 'Sales Manager', 320000, 'Sales', '1999-12-31'), 
  ('Joan', 'Johnsson', 'PR Manager', 400000, 'PR', '2020-12-25'), 
  ('Simonna', 'Simonsson', 'Web developer', 549345, 'Dev', '2020-11-25'), 
  ('Bim', 'Timsson', 'DevOps', 400000, 'Dev', '2020-10-25'), 
  ('Bola', 'Lolasson', 'Art Director', 234567, 'Art', '2022-01-11'), 
  ('Haga', 'Doe', 'Manager', 123456, 'Management', '2020-11-11'), 
  ('Jennifer', 'Cat', 'Sound Producer', 543216, 'Art', '2020-09-10'), 
  ('Claudia', 'Simpson', 'Son of Homer', 543216, 'Simpsons', '1999-02-11'), 
  ('Lissa', 'Simpson', 'Daughter of Homer', 654765, 'Simpsons', '1999-02-11'), 
  ('Ekow', 'Sampson', 'Father', 333333, 'Simpsons', '1999-02-11'),
  ('Beatrice', 'Nobody Knows', 'Son', 333333, 'Family Guy', '2000-02-03')
;

describe employee;
select * from employee;

insert into locations(country, city, street, postal_code, employee_id)
values
  ('Poland', 'Krakow', 'Wlodecka 16', '23456', 1),
  ('Germany', 'Berlin', 'Vasagatan 15', '63567', 2),
  ('Sweden', 'Gothenburg', 'Kristiansgatan 2', '43555', 3),
  ('Denmark', 'Cophenhagan', 'Lillatorget 1', '33344', 4),
  ('Korea', 'Kiruna', 'Storgatan 6', '66554', 5),
  ('Wonderland', 'Wondercity', 'Wonder street 888', '88888', 6),
  ('Simon Country', 'Simon City', 'Simon Street', '55555', 7),
  ('UK', 'Springfield', 'Unknown Street 13', '77777', 8),
  ('Austria', 'Springfield', 'Unknown Street 13', '77777', 9),
  ('Neitherland', 'Springfield', 'Unknown Street 13', '77777', 10),
  ('UK', 'London', 'Strange street 9', '88888', 11)
;

describe locations;
select * from locations;
