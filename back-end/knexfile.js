require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL,
  DATABASE_URL_DEVELOPMENT,
  DATABASE_URL_TEST,
  DATABASE_URL_PREVIEW,
  DEBUG,
  RENDER_HOST,
  RENDER_USER,
  RENDER_PASSWORD,
  RENDER_DATABASE
} = process.env;

const renderConnection = {
  host: RENDER_HOST,
  user: RENDER_USER,
  password: RENDER_PASSWORD,
  database: RENDER_DATABASE,
  ssl: {
    rejectUnauthorized: false, // this will ignore self-signed certificates
  },
};

module.exports = {
  development: {
    client: "pg",
    pool: { min: 2, max: 10 },
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "pg",
    pool: { min: 2, max: 10 },
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "pg",
    pool: { min: 2, max: 10 },
    connection: {
      connectionString: DATABASE_URL_PREVIEW,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "pg",
    pool: { min: 2, max: 10 },
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  }
};