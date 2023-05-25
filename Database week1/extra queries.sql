--->EXTRA: Give me the names of the countries that has more than 10 cities, and a total population of the cities listed (not the country population) of more than 50 million.

SELECT country.name 
FROM country
INNER JOIN city
ON country.code = city.countrycode
GROUP BY countrycode HAVING COUNT(*) > 10 AND SUM(city.population) > 50000000
ORDER BY total_city_population ASC;



--->EXTRA EXTRA: List the cities from those countries, where the city population is > 5M.

SELECT city.name, city.population
FROM city
WHERE countrycode IN (
  SELECT country.code
  FROM country
  INNER JOIN city ON country.code = city.countrycode
  GROUP BY country.code
  HAVING COUNT(city.name) > 10 AND SUM(city.population) > 50000000
)
AND city.population > 5000000
ORDER BY city.population ASC;

