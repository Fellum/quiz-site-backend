import PostgresRepository from './PostgresRepository.js'

export default class UserRepository extends PostgresRepository {
  static tableName = 'users'
}
