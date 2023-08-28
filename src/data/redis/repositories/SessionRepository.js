import RedisRepository from './RedisRepository.js'

export default class SessionRepository extends RedisRepository {
  static tableName = 'sessions'
  static expireTime = 7 * 24 * 60 * 60
}
