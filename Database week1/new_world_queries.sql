-- 1. What are the names of countries with population greater than 8 million
SELECT name, population
FROM country
WHERE population > 8000000;

-- 2. What are the names of countries that have “land” in their names ?
SELECT name
FROM country
WHERE country.name LIKE '%land%';

-- 3. What are the names of the cities with population in between 500,000 and 1 million ?
SELECT name, population
FROM country
WHERE population between 500000 and 1000000;

-- 4. What's the name of all the countries on the continent ‘Europe’ ?
SELECT name, continent 
FROM country
WHERE continent = 'Europe';

-- 5. List all the countries in the descending order of their surface areas.
SELECT name, surfacearea 
FROM country
ORDER BY surfacearea DESC;

-- 6. What are the names of all the cities in the Netherlands?
SELECT city.name, country.name
FROM city inner 
JOIN country
ON city.countrycode = country.code
WHERE country.name = 'Netherlands';

-- 7. What is the population of Rotterdam ?
SELECT name, population
FROM city
WHERE name = 'Rotterdam';

-- 8. What's the top 10 countries by Surface Area ?
SELECT name, surfacearea
FROM country
ORDER BY surfacearea DESC limit 10;

-- 9. What's the top 10 most populated cities?
SELECT name, population 
FROM city
ORDER BY population DESC limit 10;

-- 10. What is the population of the world ?
SELECT SUM(population)AS world_population FROM country;
