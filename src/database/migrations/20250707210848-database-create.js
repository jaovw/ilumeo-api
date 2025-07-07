/* eslint-disable no-undef */
'use strict';
const { Client } = require('pg');

const {
  DB_HOST, DB_PORT = 5432, DB_USER, DB_PASS, DB_NAME,
} = process.env;

async function connect() {
  const client = new Client({
    host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS, database: 'postgres',
  });
  await client.connect();
  return client;
}

module.exports = {
  up: async () => {
    const client = await connect();
    try {
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database ${DB_NAME} criado.`);
    } catch (err) {
      if (err.code === '42P04') {
        console.log(`Database ${DB_NAME} já existe – ignorando.`);
      } else {
        throw err;
      }
    } finally {
      await client.end();
    }
  },
  down: async () => {
    const client = await connect();
    await client.query(`DROP DATABASE IF EXISTS "${DB_NAME}"`);
    await client.end();
  },
};
