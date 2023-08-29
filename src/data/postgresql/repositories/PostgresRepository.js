import knex from '../connection.js'
import _ from 'lodash'

export default class PostgresRepository {
  static tableName

  static getQueryBuilder () {
    return knex(this.tableName)
  }

  static getKnex () {
    return knex
  }

  static findOne (query = {}, view = '*') {
    return knex(this.tableName)
      .select(view)
      .where(query)
      .first()
  }

  static findAndCount (query = {}, view = '*', options = { offset: 0, limit: 0 }) {
    const { ids, ...basicQuery } = query

    const additionalQuery = query => {
      if (!_.isEmpty(ids)) query.whereIn('id', ids)
    }

    const commonQuery = knex(this.tableName)
      .where(basicQuery)
      .where(additionalQuery)

    const valuesQuery = commonQuery
      .clone()
      .select(view)
      .offset(options.offset)
      .limit(options.limit)

    const countQuery = commonQuery
      .clone()
      .count()
      .returning('count')
      .first()
      .then(({ count }) => count)

    return Promise.all([valuesQuery, countQuery])
  }

  static find (query = {}, view = '*', options = { offset: 0, limit: 0 }) {
    const { ids, ...basicQuery } = query

    const additionalQuery = query => {
      if (!_.isEmpty(ids)) query.whereIn('id', ids)
    }

    return knex(this.tableName)
      .select(view)
      .where(basicQuery)
      .where(additionalQuery)
      .offset(options.offset)
      .limit(options.limit)
  }

  static create (value, view = '*') {
    return knex(this.tableName)
      .insert(value)
      .returning(view)
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
