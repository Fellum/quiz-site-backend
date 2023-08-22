/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('questions', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .text('text')
      .notNullable()
    table
      .json('answers')
      .nullable()
    table
      .string('answerType')
      .notNullable()
      .defaultTo('single')
    table
      .integer('ord')
    table
      .uuid('quizId')
      .notNullable()
      .references('id')
      .inTable('quizzes')
      .onDelete('CASCADE')
  })
}

/**
       * @param { import("knex").Knex } knex
       * @returns { Promise<void> }
       */
export function down (knex) {

}
