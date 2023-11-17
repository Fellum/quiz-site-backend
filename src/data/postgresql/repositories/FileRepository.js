import PostgresRepository from './PostgresRepository.js'

export default class FileRepository extends PostgresRepository {
  static tableName = 'files'
}
