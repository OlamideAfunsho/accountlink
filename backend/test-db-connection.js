const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Database',
  database: 'accountlink',
});

client.connect()
  .then(() => {
    console.log('✅ SUCCESS! Connected to PostgreSQL');
    console.log('Database connection working perfectly!');
    return client.end();
  })
  .catch((err) => {
    console.error('❌ FAILED! Connection error:', err.message);
    console.error('Full error:', err);
  });
