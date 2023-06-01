const mysql = require('mysql2');
const readline = require('readline');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mrsowusu@92',
  database: 'new_world'
});

// Connect to the MySQL server
connection.connect(async (err) => {
  if (err) {
    console.error('Error connecting to MySQL server:', err);
    return;
  }

  // Prompt for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const choice = await askQuestion(rl, 'Choose a query (1-4):\n1. What is the capital of country X?\n2. List all the languages spoken in the region Y\n3. Find the number of cities in which language Z is spoken\n4. List all the continents with the number of languages spoken in each continent\n\nEnter your choice: ');

    switch (choice) {
      case '1':
        const countryName = await askQuestion(rl, 'Enter the country name: ');
        await getCapital(countryName);
        break;
      case '2':
        const region = await askQuestion(rl, 'Enter the region name: ');
        await listLanguagesInRegion(region);
        break;
      case '3':
        const language = await askQuestion(rl, 'Enter the language: ');
        await countCitiesWithLanguage(language);
        break;
      case '4':
        await listContinentsWithLanguageCount();
        break;
      default:
        console.log('Invalid choice. Exiting...');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    closeConnection();
    rl.close();
  }
});

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


// 5. For the country given as input, is there any countries that have the same official language is in the same continent
function readsqlQuestion5Input() {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    interface.question("Please provide country name to get other countries with same official languages and same continent: ", (answer) => {
      interface.close();
      resolve(answer);
    })
  );
}

let getCountriesSameLanguage = async function () {
  const sameLanguages = await readsqlQuestion5Input();

  // For the country given as input, find countries with the same official language and other countries in the same continent
  connection.execute(
    `SELECT
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
      c1.Code`,
    [sameLanguages, sameLanguages, sameLanguages, sameLanguages],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        return;
      }

      if (results.length > 0) {
        console.log(results[0].LanguageMatch);
        console.log(results[0].ContinentMatch);
      } else {
        console.log("No matching countries found.");
      }
    }
  );

  connection.on("error", function () {
    console.log("connection error");
  });

  // read inputs again
  return await readInput();
};











