import knex from 'knex';

export const dataSource = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './data/data.db',
  },
  useNullAsDefault: true,
});
