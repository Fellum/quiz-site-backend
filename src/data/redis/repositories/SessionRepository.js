import RedisRepository from './RedisRepository.js'

export default class SessionRepository extends RedisRepository {
  static tableName = 'sessions'
}
