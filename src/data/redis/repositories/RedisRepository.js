import * as uuid from 'uuid'
import connection from '../connection.js'
import _ from 'lodash'

export default class RedisRepository {
  static tableName

  static toRedisId (id) {
    return `${this.tableName}:${id}`
  }

  static getById (id) {
    return connection.hGetAll(this.toRedisId(id))
      .then(result => _.isEmpty(result) ? undefined : { id, ...result })
  }

  static async create (value) {
    const id = uuid.v4()
    const redisId = this.toRedisId(id)
    await connection.hSet(redisId, value)
    const savedValue = await connection.hGetAll(redisId)
    return {
      id,
      ...savedValue
    }
  }

  static async updateById (id, value) {
    const redisId = this.toRedisId(id)
    await connection.hSet(redisId, value)
    const savedValue = await connection.hGetAll(redisId)
    return {
      id,
      ...savedValue
    }
  }

  static deleteById (id) {
    return connection.hDel(this.toRedisId(id))
  }
}
