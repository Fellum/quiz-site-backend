import knex from '../connection.js'
import _ from 'lodash'

export default class PostgresRepository {
  static tableName

  static findOne (query = {}, view = '*') {
    return knex(this.tableName)
      .select(view)
      .where(query)
      .first()
  }

  static find (query = {}, view = '*') {
    const { ids, ...basicQuery } = query

    const additionalQuery = query => {
      if (!_.isEmpty(ids)) query.whereIn('id', ids)
    }

    return knex(this.tableName)
      .select(view)
      .where(basicQuery)
      .where(additionalQuery)
  }

  static create (value) {
    return knex(this.tableName)
      .insert(value)
      .returning('*')
      .then(([res]) => res)
  }

  static updateById (id, value) {
    return knex(this.tableName)
      .update(value)
      .where({ id })
      .returning('*')
      .then(([res]) => res)
  }

  static deleteById (id) {
    return knex(this.tableName)
      .del()
      .where({ id })
  }
}
