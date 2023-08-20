import PostgresRepository from './PostgresRepository.js'

export default class SessionRepository extends PostgresRepository {
  static tableName = 'sessions'
}
