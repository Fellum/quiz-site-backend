/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up (knex) {
  return knex.schema.createTable('files', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .text('internalPath')
      .notNullable()
    table
      .text('externalPath')
      .notNullable()
    table
      .text('encoding')
      .notNullable()
    table
      .text('mimetype')
      .notNullable()
    table
      .integer('size')
    table
      .uuid('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export function down (knex) {

}
