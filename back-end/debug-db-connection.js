require('dotenv').config();
const knex = require('knex')(require('./knexfile').development);

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('DATABASE_URL_TEST:', process.env.DATABASE_URL_TEST);
console.log('DATABASE_URL_PREVIEW:', process.env.DATABASE_URL_PREVIEW);

knex.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });
