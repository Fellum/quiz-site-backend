/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('sessions', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .string('refreshToken')
      .notNullable()
    table
      .uuid('userId')
      .references('id')
      .inTable('users')
  })
}

/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
export function down (knex) {

}
