/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .string('username')
      .notNullable()
      .unique()
    table
      .string('email')
      .notNullable()
      .unique()
    table
      .string('passwordHash')
      .nullable()
    table
      .string('passwordSalt')
      .nullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {

}
