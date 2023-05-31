const mysql = require('mysql2');
const readline = require('readline');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mrsowusu@92',
  database: 'new_world',
});

// Create a readline interface to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');

  // Prompt the user for the queries
  rl.question('Enter the country code (X): ', (countryCode) => {
    getCapital(countryCode);
  });

  rl.question('Enter the region name (Y): ', (regionName) => {
    getLanguagesInRegion(regionName);
  });

  rl.question('Enter the language name (Z): ', (languageName) => {
    getCitiesByLanguage(languageName);
  });

  getContinentsWithLanguageCount();

  rl.close();
});

// Query: What is the capital of country X?
function getCapital(countryCode) {
  const query = 'SELECT city.Name FROM city INNER JOIN country ON city.ID = country.Capital WHERE country.Name?';
  const params = [countryName];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    if (results.length === 0) {
      console.log('Country not found.');
    } else {
      console.log('Capital:', results[0].capital);
    }
  });
}

// Query: List all the languages spoken in the region Y
function getLanguagesInRegion(regionName) {
  const query = 'SELECT language FROM countrylanguage ' +
                'JOIN country ON country.code = countrylanguage.countrycode ' +
                'WHERE country.region = ?';
  const params = [regionName];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    if (results.length === 0) {
      console.log('Region not found.');
    } else {
      const languages = results.map((row) => row.language);
      console.log('Languages:', languages.join(', '));
    }
  });
}

// Query: Find the number of cities in which language Z is spoken
function getCitiesByLanguage(languageName) {
  const query = 'SELECT COUNT(city.name) AS cityCount FROM city ' +
                'JOIN countrylanguage ON city.countrycode = countrylanguage.countrycode ' +
                'WHERE countrylanguage.language = ?';
  const params = [languageName];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Number of cities:', results[0].cityCount);
  });
}

// Query: List all the continents with the number of languages spoken in each continent
function getContinentsWithLanguageCount() {
  const query = 'SELECT country.continent, COUNT(DISTINCT countrylanguage.language) AS languageCount ' +
                'FROM country ' +
                'JOIN countrylanguage ON country.code = countrylanguage.countrycode ' +
                'GROUP BY country.continent';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    console.log('Continents with language count:');
    results.forEach((row) => {
      console.log(row.continent, ':', row.languageCount);
    });
  });
}



// Function to execute the queries
function executeQueries(country) {
  const sqlQuery = `SELECT c2.country_name
                    FROM countries AS c1
                    JOIN countries AS c2 ON c1.language = c2.language
                    WHERE c1.country_name = ? AND c1.country_name != c2.country_name
                    UNION
                    SELECT c3.country_name
                    FROM countries AS c1
                    JOIN countries AS c3 ON c1.continent = c3.continent
                    WHERE c1.country_name = ? AND c1.country_name != c3.country_name`;

  // Execute the prepared statement
  connection.query(sqlQuery, [country, country], (error, results) => {
    if (error) {
      console.error('Error executing queries:', error);
    } else {
      if (results.length > 0) {
        console.log('Countries with the same official language or in the same continent:');
        results.forEach((row) => {
          console.log(row.country_name);
        });
      } else {
        console.log('FALSE');
      }
    }

    // Close the database connection
    connection.end();
  });
}

// Get user input for the country
rl.question('Enter the country: ', (country) => {
  executeQueries(country);
  rl.close();
});
