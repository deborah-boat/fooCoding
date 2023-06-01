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


  // Prompt for user input
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

// Utility function to ask a question and return the user's input
function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Get the capital of a country
function getCapital(countryName) {
  const query = 'SELECT city.name AS capital FROM country INNER JOIN city ON country.capital = city.id WHERE country.name = ?';

  return new Promise((resolve, reject) => {
    connection.query(query, [countryName], (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results.length === 0) {
          console.log('Country not found');
        } else {
          const capital = results[0].capital;
          console.log(`Capital of ${countryName}: ${capital}`);
        }
        resolve();
      }
    });
  });
}

// List all languages spoken in a region
function listLanguagesInRegion(regionName) {
  const query = 'SELECT DISTINCT cl.language FROM country c  INNER JOIN countrylanguage cl ON c.code = cl.countrycode WHERE c.region = ?';

  return new Promise((resolve, reject) => {
    connection.query(query, [regionName], (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results.length === 0) {
          console.log('No languages found');
        } else {
          const languages = results.map((row) => row.language);
          console.log(`Languages spoken in ${regionName}: ${languages.join(', ')}`);
        }
        resolve();
      }
    });
  });
}

// Get the number of cities where a language is spoken
function countCitiesWithLanguage(language) {
  const query = 'SELECT COUNT(DISTINCT city.id) AS cityCount FROM city INNER JOIN countrylanguage ON city.CountryCode = countrylanguage.CountryCode WHERE countrylanguage.Language = ?';

  return new Promise((resolve, reject) => {
    connection.query(query, [language], (err, results) => {
      if (err) {
        reject(err);
      } else {
        const cityCount = results[0].cityCount;
        console.log(`Number of cities where ${language} is spoken: ${cityCount}`);
        resolve();
      }
    });
  });
}

// List all continents with the number of languages spoken in each continent
function listContinentsWithLanguageCount() {
  const query = 'SELECT continent, COUNT(DISTINCT language) AS language_count FROM country INNER JOIN countrylanguage ON country.Code = countrylanguage.CountryCode GROUP BY continent';

  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        results.forEach((row) => {
          console.log(`${row.continent}: ${row.language_count} languages`);
        });
        resolve();
      }
    });
  });
}

// Close the database connection
function closeConnection() {
  connection.end((err) => {
    if (err) {
      console.error('Error closing connection:', err);
    }
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
