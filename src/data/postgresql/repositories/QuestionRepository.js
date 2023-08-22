import PostgresRepository from './PostgresRepository.js'

export default class QuestionRepository extends PostgresRepository {
  static tableName = 'questions'
}
