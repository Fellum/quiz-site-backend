/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.alterTable('quizzes', table => {
    table
      .uuid('imageId')
      .nullable()
      .references('id')
      .inTable('files')
      .onDelete('SET NULL')
  })
}

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export function down (knex) {

}
