import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const players = sqliteTable('players', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  email: text('email'),
});
