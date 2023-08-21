import PostgresRepository from './PostgresRepository.js'

export default class QuizRepository extends PostgresRepository {
  static tableName = 'quizzes'
}
