const mysql = require('mysql2');
const readline = require('readline');
const dotenv = require('dotenv');

dotenv.config();

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mrsowusu@92',
  database: 'new_world',
});



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a menu prompt
function showMenu() {
  console.log('\nMenu:');
  console.log('1. Get Capital after entering country');
  console.log('2. Get languages by region');
  console.log('3. Get number of cities that speak a language');
  console.log('4. Get language count by continent');
  console.log('5. Check official language and continent');
  console.log('0. Exit');

  rl.question('Select a question (0-5): ', (choice) => {
    switch (choice) {
      case '0':
        console.log('Exiting...');
        rl.close();
        break;
      case '1':
        getCapitalCity();
        break;
      case '2':
        getLanguage();
        break;
      case '3':
        getCityCountByLanguage();
        break;
      case '4':
        getLanguageCountByContinent();
        break;
      case '5':
        getCountriesSame();
        break;
      default:
        console.log('Invalid choice. Please try again.\n');
        break;
    }
  });
}
showMenu();

function exitApp() {
  console.log('Exiting...');
  connection.end();
  rl.close();
}

// 1. Get Capital after entering country
function getCapitalCity() {
  // Drop the existing stored procedure if it exists
  const dropProcedure = 'DROP PROCEDURE IF EXISTS GetCapitalCity';
  const createProcedure = `
    CREATE PROCEDURE GetCapitalCity(IN countryName VARCHAR(255))
    BEGIN
      SET @query = CONCAT('SELECT city.name AS city_name FROM city INNER JOIN country ON city.ID = country.Capital WHERE country.Name = ', QUOTE(countryName));
      PREPARE stmt FROM @query;
      EXECUTE stmt;
      DEALLOCATE PREPARE stmt;
    END`;

  connection.query(dropProcedure, (err) => {
    if (err) {
      console.error('Failed to drop stored procedure:', err);
      return;
    }

    connection.query(createProcedure, (err) => {
      if (err) {
        console.error('Failed to create stored procedure:', err);
        return;
      }

      rl.question('Enter country name to get capital name: ', (countryName) => {
        const callProcedure = 'CALL GetCapitalCity(?)';
        connection.query(callProcedure, [countryName], (err, results) => {
          if (err) {
            console.error('Failed to call stored procedure:', err);
            return;
          }

          if (results[0].length > 0) {
            const capitalCity = results[0][0].city_name;
            console.log('Capital City:', capitalCity);
          } else {
            console.log('No capital city found for the specified country.');
          }

          const dropProcedure = 'DROP PROCEDURE IF EXISTS GetCapitalCity';
          connection.query(dropProcedure, (err) => {
            if (err) {
              console.error('Failed to drop stored procedure:', err);
            }
            showMenu();
          });
        });
      });
    });
  });
}


// 2. Function to prompt for region name
function getLanguage() {
  // Drop the existing stored procedure if it exists
  const dropProcedure = 'DROP PROCEDURE IF EXISTS GetLanguagesByRegion';
  connection.query(dropProcedure, (err) => {
    if (err) {
      console.error('Failed to drop stored procedure:', err);
      return;
    }
    const createProcedure = `
      CREATE PROCEDURE GetLanguagesByRegion(IN regionName VARCHAR(255))
      BEGIN
        SET @query = CONCAT('SELECT DISTINCT language AS language FROM countrylanguage INNER JOIN country ON country.Code = countrylanguage.CountryCode WHERE country.Region = ', QUOTE(regionName));
        PREPARE stmt FROM @query;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
      END`;

    connection.query(createProcedure, (err) => {
      if (err) {
        console.error('Failed to create stored procedure:', err);
        return;
      }

      rl.question('Enter region name to get languages: ', (regionName) => {
        const callProcedure = 'CALL GetLanguagesByRegion(?)';
        connection.query(callProcedure, [regionName], (err, results) => {
          if (err) {
            console.error('Failed to call stored procedure:', err);
            return;
          }

          if (results[0].length > 0) {
            console.log('Languages in the selected region:');
            results[0].forEach((row) => {
              console.log(row.language);
            });
          } else {
            console.log('No languages found for the specified region.');
          }

          const dropProcedure = 'DROP PROCEDURE IF EXISTS GetLanguagesByRegion';
          connection.query(dropProcedure, (err) => {
            if (err) {
              console.error('Failed to drop stored procedure:', err);
            }
            showMenu();
          });
        });
      });
    });
  });
}


// 3. Find the number of cities that speak language Z
function getCityCountByLanguage() {
  // Drop the existing stored procedure if it exists
  const dropProcedure = 'DROP PROCEDURE IF EXISTS GetCityCountByLanguage';
  const createProcedure = `
    CREATE PROCEDURE GetCityCountByLanguage(IN languageCode VARCHAR(255))
    BEGIN
      SET @query = CONCAT('SELECT COUNT(DISTINCT city.Name) AS city_count FROM countrylanguage JOIN city ON countrylanguage.CountryCode = city.CountryCode WHERE countrylanguage.Language = ', QUOTE(languageCode));
      PREPARE stmt FROM @query;
      EXECUTE stmt;
      DEALLOCATE PREPARE stmt;
    END`;

  connection.query(dropProcedure, (err) => {
    if (err) {
      console.error('Failed to drop stored procedure:', err);
      return;
    }

    connection.query(createProcedure, (err) => {
      if (err) {
        console.error('Failed to create stored procedure:', err);
        return;
      }

      rl.question('Enter language to get number cities that speak this languages: ', (languageCode) => {
        const callProcedure = 'CALL GetCityCountByLanguage(?)';
        connection.query(callProcedure, [languageCode], (err, results) => {
          if (err) {
            console.error('Failed to call stored procedure:', err);
            return;
          }

          const cityCount = results[0][0].city_count;
          console.log('Number of cities where selected language is spoken:', cityCount);

          const dropProcedure = 'DROP PROCEDURE IF EXISTS GetCityCountByLanguage';
          connection.query(dropProcedure, (err) => {
            if (err) {
              console.error('Failed to drop stored procedure:', err);
            }
            showMenu();
          });
        });
      });
    });
  });
}
getCityCountByLanguage();

// 4. List all the continents with the number of languages spoken in each continent

function getLanguageCountByContinent() {
  const query = `
    SELECT country.Continent, COUNT(DISTINCT countrylanguage.Language) AS language_count
    FROM country
    JOIN countrylanguage ON country.Code = countrylanguage.CountryCode
    GROUP BY country.Continent
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch language count by continent:', err);
      return;
    }

    console.log('Language count by continent:');
    results.forEach((row) => {
      console.log(`Continent: ${row.Continent}, Number of languages spoken: ${row.language_count}`);
    });
    showMenu();
  });
}

// 5. Check official language and continent
function getCountriesSame() {
  const dropProcedure = 'DROP PROCEDURE IF EXISTS GetDistinctLanguagesByCountry';
  connection.query(dropProcedure, (err) => {
    if (err) {
      console.error('Failed to drop stored procedure:', err);
      return;
    }

    const createProcedure = `
      CREATE PROCEDURE GetDistinctLanguagesByCountry(IN countryName VARCHAR(255))
      BEGIN
        SET @query = '
          SELECT
            CONCAT("Countries with the same official language as ", ?, ": ", IFNULL(GROUP_CONCAT(DISTINCT c1.Name SEPARATOR ", "), "")) AS LanguageMatch,
            CONCAT("Other countries in the same continent as ", ?, ": ", IFNULL(GROUP_CONCAT(DISTINCT c2.Name SEPARATOR ", "), "")) AS ContinentMatch
          FROM
            country AS c1
          JOIN
            countrylanguage AS cl1 ON c1.Code = cl1.CountryCode
          JOIN
            country AS c2 ON c1.Continent = c2.Continent
          WHERE
            cl1.IsOfficial = "T" AND
            c1.Name <> ? AND
            cl1.Language IN (
              SELECT
                cl2.Language
              FROM
                country AS c3
              JOIN
                countrylanguage AS cl2 ON c3.Code = cl2.CountryCode
              WHERE
                c3.Name = ? AND
                cl2.IsOfficial = "T"
            )
          GROUP BY
            c1.Code';
        PREPARE stmt FROM @query;
        SET @countryName = countryName;
        EXECUTE stmt USING @countryName, @countryName, @countryName, @countryName;
        DEALLOCATE PREPARE stmt;
      END`;

    connection.query(createProcedure, (err) => {
      if (err) {
        console.error('Failed to create stored procedure:', err);
        return;
      }

      rl.question('Enter country name to get distinct languages: ', (countryName) => {
        const callProcedure = 'CALL GetDistinctLanguagesByCountry(?)';
        connection.query(callProcedure, [countryName], (err, results) => {
          if (err) {
            console.error('Failed to call stored procedure:', err);
            return;
          }

          const rows = results[0];
          if (rows.length > 0) {
            const languageMatch = rows[0].LanguageMatch;
            const continentMatch = rows[0].ContinentMatch;

            if (languageMatch !== '') {
              console.log(languageMatch);
            } else {
              console.log('No countries found with the same official language.');
            }
            
            if (continentMatch !== '') {
              console.log(continentMatch);
            } else {
              console.log('No other countries found in the same continent.');
            }
          } else {
            console.log('No matching data found for the country:', countryName);
          }

          const dropProcedure = 'DROP PROCEDURE IF EXISTS GetDistinctLanguagesByCountry';
          connection.query(dropProcedure, (err) => {
            if (err) {
              console.error('Failed to drop stored procedure:', err);
            }
            showMenu();
          });
        });
      });
    });
  });
}

getCountriesSame();