const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgressql://localhost/fishes-app'
});

client.connect();

module.exports = client;
