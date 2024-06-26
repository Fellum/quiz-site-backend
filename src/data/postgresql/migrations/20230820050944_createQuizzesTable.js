/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('quizzes', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .string('title')
      .notNullable()
    table
      .text('description')
      .notNullable()
      .defaultTo('')
    table
      .uuid('ownerUserId')
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
