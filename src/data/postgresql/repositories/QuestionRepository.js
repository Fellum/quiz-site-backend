import PostgresRepository from './PostgresRepository.js'

export default class QuestionRepository extends PostgresRepository {
  static tableName = 'questions'
  static views = {
    withUserOwnerId: () => this.getKnex()
      .select('ownerUserId')
      .whereRaw('quizzes.id = questions."quizId"')
      .from('quizzes')
      .as('ownerUserId')
  }
}
