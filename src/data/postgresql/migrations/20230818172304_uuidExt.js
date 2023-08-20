/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.raw('create extension if not exists "uuid-ossp"')
}

export function down (knex) {}
