import PostgresRepository from './PostgresRepository.js'

export default class QuizRepository extends PostgresRepository {
  static tableName = 'quizzes'
  static views = {
    default: () => [
      '*',
      QuizRepository.views.withImageUrl()
    ],
    withImageUrl: () => this.getKnex()
      .select('externalPath')
      .whereRaw('quizzes."imageId" = files."id"')
      .from('files')
      .as('imageUrl')
  }
}
